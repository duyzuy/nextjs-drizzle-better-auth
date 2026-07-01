export class PaginationService {
	private readonly maxPageSize = 20;
	private readonly defaultPage = 1;
	private readonly defaultPageSize = 10;

	createPaginate(params: { page: number; pageSize: number }) {
		const page =
			Number.isInteger(params.page) && params.page > 0 ? params.page : this.defaultPage;

		const pageSize =
			Number.isInteger(params.pageSize) && params.pageSize > 0
				? Math.min(params.pageSize, this.maxPageSize)
				: this.defaultPageSize;

		return {
			offset: (page - 1) * pageSize,
			limit: pageSize,
			page,
		};
	}
}
