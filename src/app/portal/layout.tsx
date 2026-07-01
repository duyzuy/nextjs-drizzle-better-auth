import type { Metadata } from "next";
import AdminLayout from "@/features/layouts/AdminLayout";

export const metadata: Metadata = {
	title: "Portal",
	description: "Portal",
};

export default function RootAdminLayout({ children }: { children: React.ReactNode }) {
	return <AdminLayout>{children}</AdminLayout>;
}
