import React from "react";
import { PointerIcon, TagIcon, UserPackageIcon } from "@/components/icons";

export interface HightLightBoxProps {
	className?: string;
}

const HightLightBoxes: React.FC<HightLightBoxProps> = () => {
	const items = [
		{
			icon: React.createElement(PointerIcon, { className: "w-12 h-12" }),
			title: "One Click Booking.",
			descriptions: "You can hassle-free and fast tour & travel package booking by GoFly.",
		},
		{
			icon: React.createElement(TagIcon, { className: "w-12 h-12" }),
			title: "Discount & Offer.",
			descriptions: "Agencies have special discounts on flights, hotels, & packages.",
		},
		{
			icon: React.createElement(UserPackageIcon, { className: "w-12 h-12" }),
			title: "Local Experties.",
			descriptions: "You can hassle-free and fast tour & travel package booking by GoFly.",
		},
	];
	return (
		<div className="container mx-auto px-4 md:px-6 lg:px-8">
			<div className="boxes flex items-center gap-6">
				{items.map((item) => (
					<div key={item.title} className="p-6 border rounded-2xl">
						<div className="box-icon">
							<span className="inline-block">{item.icon}</span>
						</div>
						<div className="box-content">
							<h4 className="text-2xl font-bold">{item.title}</h4>
							<p>{item.descriptions}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default HightLightBoxes;
