import { useState, type ReactNode } from 'react'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface MarkdownRendererProps {
  content: string
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-foreground/40 transition-colors hover:text-cyan"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    const el = node as React.ReactElement<{ children?: ReactNode }>
    return extractText(el.props.children)
  }
  return ''
}

const components: Components = {
  h2({ children }) {
    return (
      <h2 className="border-l-2 border-cyan/40 pl-4">{children}</h2>
    )
  },
  h3({ children }) {
    return (
      <h3 className="border-l-2 border-cyan/30 pl-4">{children}</h3>
    )
  },
  pre({ children }) {
    const codeEl = children as React.ReactElement<{
      className?: string
      children?: ReactNode
    }>
    const className = codeEl?.props?.className ?? ''
    const langMatch = className.match(/language-(\w+)/)
    const lang = langMatch ? langMatch[1] : ''
    const codeText = extractText(codeEl?.props?.children)

    return (
      <div className="group/code relative my-6 overflow-hidden rounded-lg border border-card-border bg-[#0d0d14]">
        <div className="flex items-center justify-between border-b border-card-border px-4 py-2">
          <span className="font-mono text-xs text-foreground/40">
            {lang || 'code'}
          </span>
          <CopyButton text={codeText} />
        </div>
        <pre className="!my-0 !rounded-none !border-0 !bg-transparent">
          {children}
        </pre>
      </div>
    )
  },
  code({ children, className }) {
    const isBlock = className?.includes('language-') || className?.includes('hljs')
    if (isBlock) {
      return <code className={className}>{children}</code>
    }
    return (
      <code className="rounded bg-cyan/10 px-1.5 py-0.5 text-sm text-cyan">
        {children}
      </code>
    )
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-cyan/40 bg-cyan/5 pl-4 italic">
        {children}
      </blockquote>
    )
  },
  ul({ children }) {
    return <ul className="list-none space-y-2">{children}</ul>
  },
  li({ children }) {
    return (
      <li className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan/60">
        {children}
      </li>
    )
  },
  hr() {
    return (
      <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
    )
  },
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-invert prose prose-lg max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  )
}
