export interface PaginationResult<T> {
	items: T[];
	page: number;
	pageSize: number;
	totalItem: number;
	totalPage: number;
}
