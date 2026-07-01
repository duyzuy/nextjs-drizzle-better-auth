import { SearchIcon } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Suspense } from "react";
import { Button } from "@/components/base/button";
import ThemeModeButton from "@/features/theme/components/ThemeModeButton";
import { cn } from "@/lib/utils";
import UserButton, { UserButtonSkeleton } from "./UserButton";

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
						<Suspense fallback={<UserButtonSkeleton />}>
							<UserButton />
						</Suspense>
						<ThemeModeButton />
					</div>
				</div>
			</div>
		</header>
	);
};
export default MainHeader;
