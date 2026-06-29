"use client";
import dayjs from "dayjs";
import { MoreHorizontalIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { Button } from "@/components/base/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/base/table";
import { getUsers } from "../actions/get-users";

const UsersTable = () => {
	const {
		execute,
		isPending,
		isExecuting,
		result: { data },
	} = useAction(getUsers);

	console.log(data);

	useEffect(() => {
		execute({ page: 1, pageSize: 10, q: "" });
	}, [execute]);

	if (isExecuting) {
		return <div>Loading...</div>;
	}

	if (data?.status === "error") {
		return <div>Something error</div>;
	}

	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
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
				{data?.data.items.map((user, _index) => (
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
	);
};

export default UsersTable;
