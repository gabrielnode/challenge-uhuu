export interface ICreateUser<T, R> {
  createNew: (data: T) => Promise<R>
}
