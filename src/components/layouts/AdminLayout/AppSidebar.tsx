"use client";

import {
	Bot,
	ChartSpline,
	Command,
	Frame,
	LifeBuoy,
	MapPin,
	PieChart,
	Send,
	SquareTerminal,
} from "lucide-react";
import type * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../../base/sidebar";
import { NavMain } from "./NavMain";
// import { NavProjects } from "./NavProject";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/portal/dashboard",
			icon: ChartSpline,
			isActive: true,
		},
		{
			title: "Users",
			url: "/portal/users",
			icon: SquareTerminal,
			isActive: true,
			// items: [
			// 	{
			// 		title: "User list",
			// 		url: "/portal/users/list",
			// 	},
			// ],
		},
		{
			title: "Roles",
			url: "/portal/roles",
			icon: Bot,
			// items: [
			// 	{
			// 		title: "Role list",
			// 		url: "/portal/roles",
			// 	},
			// ],
		},
		// {
		// 	title: "Documentation",
		// 	url: "#",
		// 	icon: BookOpen,
		// 	items: [
		// 		{
		// 			title: "Introduction",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Get Started",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Tutorials",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Changelog",
		// 			url: "#",
		// 		},
		// 	],
		// },
		// {
		// 	title: "Settings",
		// 	url: "#",
		// 	icon: Settings2,
		// 	items: [
		// 		{
		// 			title: "General",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Team",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Billing",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Limits",
		// 			url: "#",
		// 		},
		// 	],
		// },
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapPin,
		},
	],
};

interface AppSidebarProps {
	className?: string;
	mainMenu?: React.ReactNode;
	secondaryMenu?: React.ReactNode;
	bottomMenu?: React.ReactNode;
}
export function AppSidebar({ ...props }: AppSidebarProps) {
	return (
		<Sidebar variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Acme Inc</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{props.mainMenu}
				<NavMain items={data.navMain} />
				{/* <NavProjects projects={data.projects} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
				{props.secondaryMenu}
			</SidebarContent>
			<SidebarFooter>
				{props.bottomMenu}
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
