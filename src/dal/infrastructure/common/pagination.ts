export class Pagination {
	private MAX_PAGE_SIZE = 20;
	private DEFAULT_PAGE = 1;
	private DEFAULT_PAGE_SIZE = 10;

	constructor(maxPageSize = 20, defaultPageSize = 10) {
		this.MAX_PAGE_SIZE = maxPageSize;
		this.DEFAULT_PAGE_SIZE = defaultPageSize;
	}
	createPaginate(params: { page: number; pageSize: number }) {
		const page =
			Number.isInteger(params.page) && params.page > 0 ? params.page : this.DEFAULT_PAGE;

		const pageSize =
			Number.isInteger(params.pageSize) && params.pageSize > 0
				? Math.min(params.pageSize, this.MAX_PAGE_SIZE)
				: this.DEFAULT_PAGE_SIZE;

		return {
			offset: (page - 1) * pageSize,
			limit: pageSize,
			page,
		};
	}
}
