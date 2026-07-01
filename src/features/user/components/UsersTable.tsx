"use client";
import dayjs from "dayjs";
import { MoreHorizontalIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "@/components/base/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/base/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/base/table";
import { usePagination } from "@/hooks/usePagination";
import { useGetUsers } from "../hooks/useGetUsers";

const UsersTable = () => {
	const [queryParams, setQueryParams] = useState({ page: 1, pageSize: 20, q: "" });
	const { isPending, data } = useGetUsers(queryParams);

	const handleChangePage = (newPage: number) => {
		setQueryParams((prev) => ({ ...prev, page: newPage }));
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Something error</div>;
	}

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">STT</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Created at</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.items.map((user, _index) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{_index + 1}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								{user.emailVerified ? <span>Active</span> : <span>In-active</span>}
							</TableCell>
							<TableCell className="text-right">
								{dayjs(user.createdAt).format("HH:mm - DD/MM/YYYY")}
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon" className="size-8">
											<MoreHorizontalIcon />
											<span className="sr-only">Open menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>View</DropdownMenuItem>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Duplicate</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem variant="destructive">
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="h-6" />
			<TablePagination
				onChangePage={handleChangePage}
				page={data.page}
				totalPage={data.totalPage}
				pageSize={data.pageSize}
			/>
		</div>
	);
};

export default memo(UsersTable);

interface TablePaginationProps {
	page?: number;
	totalPage?: number;
	pageSize?: number;
	onChangePage?: (newPage: number) => void;
}
export function TablePagination(props: TablePaginationProps) {
	const { page: currentPage = 1, totalPage = 1, onChangePage } = props;
	const paginationPages = usePagination({ page: currentPage, totalPage });

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				{paginationPages.map((page, _index) => (
					<PaginationItem key={_index}>
						{typeof page === "string" && <PaginationEllipsis />}
						{typeof page === "number" && (
							<PaginationLink
								href="#"
								isActive={currentPage === page}
								onClick={() => onChangePage?.(page)}
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
