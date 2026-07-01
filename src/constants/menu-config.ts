import {
	Bot,
	ChartSpline,
	Frame,
	LifeBuoy,
	MapPin,
	PieChart,
	Send,
	SquareTerminal,
} from "lucide-react";
import React from "react";

export const adminMainMenuConfig = [
	{
		title: "Dashboard",
		url: "/portal/dashboard",
		icon: React.createElement(ChartSpline),
		isActive: true,
	},
	{
		title: "Users",
		url: "/portal/users",
		icon: React.createElement(SquareTerminal),
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
		icon: React.createElement(Bot),
		// items: [
		// 	{
		// 		title: "Role list",
		// 		url: "/portal/roles",
		// 	},
		// ],
	},
];

export const adminSecondaryMenu = [
	{
		title: "Support",
		url: "#",
		icon: React.createElement(LifeBuoy),
	},
	{
		title: "Feedback",
		url: "#",
		icon: React.createElement(Send),
	},
];
export const adminProductMenu = [
	{
		name: "Design Engineering",
		url: "#",
		icon: React.createElement(Frame),
	},
	{
		name: "Sales & Marketing",
		url: "#",
		icon: React.createElement(PieChart),
	},
	{
		name: "Travel",
		url: "#",
		icon: React.createElement(MapPin),
	},
];
