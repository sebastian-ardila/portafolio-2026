export interface IRepository<T, TMeta = T> {
  getAll(lang?: string): Promise<TMeta[]>
  getById(id: string, lang?: string): Promise<T | null>
}
