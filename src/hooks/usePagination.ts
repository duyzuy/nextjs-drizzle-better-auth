import { useMemo } from "react";

type UsePaginationPagesOptions = {
	page: number;
	totalPage: number;
	siblingCount?: number;
};

export function usePagination({ page, totalPage, siblingCount = 2 }: UsePaginationPagesOptions) {
	return useMemo(() => {
		if (totalPage <= 0) return [];

		const totalVisible = siblingCount * 2 + 5;

		if (totalPage <= totalVisible) {
			return Array.from({ length: totalPage }, (_, i) => i + 1);
		}

		const left = Math.max(page - siblingCount, 2);
		const right = Math.min(page + siblingCount, totalPage - 1);

		const pages: (number | "...")[] = [1];

		if (left > 2) {
			pages.push("...");
		}

		for (let i = left; i <= right; i++) {
			pages.push(i);
		}

		if (right < totalPage - 1) {
			pages.push("...");
		}

		pages.push(totalPage);

		return pages;
	}, [page, totalPage, siblingCount]);
}
