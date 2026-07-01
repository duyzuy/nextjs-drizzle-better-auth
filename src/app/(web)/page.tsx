import { ViewTransition } from "react";
import HeroSection from "@/widgets/home/HeroSection";
import HightLightBoxes from "@/widgets/home/HighlighBoxes";
export default function Home() {
	return (
		<ViewTransition
			enter={{
				"nav-forward": "nav-forward",
				"nav-back": "nav-back",
				default: "none",
			}}
			exit={{
				"nav-forward": "nav-forward",
				"nav-back": "nav-back",
				default: "none",
			}}
			default="none"
		>
			<HeroSection />
			<div className="container mx-auto"></div>
			<div className="h-8" />
			<HightLightBoxes />
			<div className="h-8" />
		</ViewTransition>
	);
}
