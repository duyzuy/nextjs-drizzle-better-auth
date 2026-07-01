import type { Metadata } from "next";
import UsersTable from "@/features/user/components/UsersTable";

export const metadata: Metadata = {
	title: "User page",
	description: "User page",
};

export default function UsersPage() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<h1 className="text-xl">Danh sach user</h1>
			<UsersTable />
		</div>
	);
}
