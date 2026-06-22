import { CheckIcon } from "lucide-react";

export interface AboutSectionProps {
	className?: string;
}
const AboutSection = () => {
	const tags = [
		{ title: "affordable Travel" },
		{ title: "trusted Experience" },
		{ title: "effortless booking process" },
	];
	return (
		<div className="about-section">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="bg-amber-100 p-6 rounded-4xl bg-[url('/assets/images/home4-about-bg.png')] bg-cover">
					<div className="grid grid-cols-2 gap-6">
						<div className="col-left">
							<h3 className="font-bold text-2xl">We’re Best Travel Agency Ever.</h3>
							<p style={{ textBox: "cap" }}>
								{`At GoFly Travel Agency, we are passionate about creating exceptional
								travel experiences. Whether you're looking for a relaxing beach
								vacation, an adventurous trek, a luxurious getaway, or a cultural
								expedition.`}
							</p>
							<div className="flex flex-wrap gap-4">
								{tags.map((tag) => (
									<div
										key={tag.title}
										className="inline-flex items-center gap-x-2 bg-black text-white rounded-full px-3 py-1"
									>
										<span>
											<CheckIcon />
										</span>
										<span className="capitalize">{tag.title}</span>
									</div>
								))}
							</div>
							<div></div>
						</div>
						<div className="rol-right">
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AboutSection;
