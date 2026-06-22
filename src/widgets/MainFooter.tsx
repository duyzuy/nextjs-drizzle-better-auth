import Link from "next/link";
export interface MainFooterProps {
	className?: string;
}

const MainFooter: React.FC<MainFooterProps> = () => {
	const MENUS = [
		{ title: "About", href: "/about" },
		{ title: "Service", href: "/service" },
		{ title: "Contact", href: "/contact" },
	];
	return (
		<footer>
			<div className="logo">
				<Link href="/">
					<span>LOGO</span>
				</Link>
			</div>
			<div className="flex-1" />
			<div className="nav-menu">
				<nav>
					{MENUS.map((menu) => (
						<li key={menu.title}>
							<Link href={menu.href}>{menu.title}</Link>
						</li>
					))}
				</nav>
			</div>
		</footer>
	);
};
export default MainFooter;
