"use client";
import { SearchIcon, User } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Button } from "@/components/base/button";
import Authorized from "@/features/auth/components/Authorized";
import TriggerSigninDialogButton from "@/features/auth/components/TriggerSigninDialogButton";
import TriggerSignupDialogButton from "@/features/auth/components/TriggerSignupDialogButton";
import UnAuthorized from "@/features/auth/components/UnAuthorized";
// import UserInformationDropdown from "@/features/profile/components/UserInformationDropdown";
import ThemeModeButton from "@/features/theme/components/ThemeModeButton";
import { cn } from "@/lib/utils";
import { AccountInformationDropdown } from "./AccountInformationDropdown";

export interface MainHeaderProps {
	className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = () => {
	const MENUS = [
		{ title: "About", href: "/about" },
		{ title: "Gallery", href: "/gallery" },
		{ title: "Collection", href: "/collection/mia-kern" },
		{ title: "Service", href: "/service" },
		{ title: "Contact", href: "/contact" },
	];
	return (
		<header>
			<div
				className={cn(
					"container mx-auto py-6 flex items-center justify-between",
					"px-4 md:px-6 lg:px-8",
				)}
			>
				<div className="logo">
					<Link href="/">
						<span>LOGO</span>
					</Link>
				</div>
				<div className="flex-1" />
				<div className="flex items-center gap-x-6">
					<div className="nav-menu">
						<nav className="flex items-center gap-x-4">
							<ul className="flex items-center gap-x-4">
								{MENUS.map((menu) => (
									<li key={menu.title}>
										<Link href={menu.href}>{menu.title}</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className="flex items-center gap-x-3">
						<Button variant="outline" size="icon" aria-label="Search">
							<SearchIcon />
						</Button>
						<Authorized>
							<AccountInformationDropdown />
						</Authorized>
						<UnAuthorized>
							<TriggerSigninDialogButton>
								<User />
								<span>Signin</span>
							</TriggerSigninDialogButton>
							<TriggerSignupDialogButton>
								<User />
								<span>SignUp</span>
							</TriggerSignupDialogButton>
						</UnAuthorized>
						<ThemeModeButton />
					</div>
				</div>
			</div>
		</header>
	);
};
export default MainHeader;
