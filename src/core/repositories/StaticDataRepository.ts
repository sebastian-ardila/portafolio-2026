import type { IRepository } from '@/core/interfaces/IRepository'

export class StaticDataRepository<T extends { id: string }>
  implements IRepository<T>
{
  private data: T[]

  constructor(data: T[]) {
    this.data = data
  }

  async getAll(): Promise<T[]> {
    return this.data
  }

  async getById(id: string): Promise<T | null> {
    return this.data.find(item => item.id === id) ?? null
  }
}
