"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/base/breadcrumb";
import { Separator } from "@/components/base/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/base/sidebar";
import { adminMainMenuConfig, adminProductMenu, adminSecondaryMenu } from "@/constants/menu-config";
import { useAppStore } from "@/stores/app-store";
import { AppSidebar } from "./AppSidebar";
import { NavMain } from "./NavMain";
import { NavProjects } from "./NavProject";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";

interface AdminLayoutProps {
	className?: string;
	children: React.ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
	const user = useAppStore((state) => state.auth.user);
	return (
		<SidebarProvider>
			<AppSidebar
				mainMenu={
					<>
						<NavMain items={adminMainMenuConfig} />
						<NavProjects projects={adminProductMenu} />
						<NavSecondary items={adminSecondaryMenu} className="mt-auto" />
					</>
				}
				footerMenu={
					<NavUser
						user={{
							name: user?.name || "",
							email: user?.email || "",
							avatar: user?.avatar || "",
						}}
					/>
				}
			/>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<main>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
