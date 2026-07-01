import Link from "next/link";
export interface MainFooterProps {
	className?: string;
}

const MainFooter: React.FC<MainFooterProps> = () => {
	const MENUS = [
		{ title: "About us", href: "/about" },
		{ title: "Service", href: "/service" },
		{ title: "Contact", href: "/contact" },
	];
	return (
		<footer>
			<div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 border-t">
				<div className="text-center">
					<div className="logo mb-6">
						<Link href="/">
							<span className="text-6xl font-black opacity-30">LOGO</span>
						</Link>
					</div>
					<div className="nav-menu">
						<ul className="flex items-center justify-center gap-x-6">
							{MENUS.map((menu) => (
								<li key={menu.title}>
									<Link href={menu.href}>{menu.title}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default MainFooter;
