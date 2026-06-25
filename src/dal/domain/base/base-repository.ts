export interface IBaseRepository<T> {
	getOne(): Promise<T>;
	getMany(): Promise<T[]>;
}
