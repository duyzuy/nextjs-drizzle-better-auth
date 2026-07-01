import { ViewTransition } from "react";
import AboutSection from "@/widgets/home/AboutSection";
import HeroSection from "@/widgets/home/HeroSection";
import HightLightBoxes from "@/widgets/home/HighlighBoxes";
// import TopDestinations from "@/widgets/home/TopDestinations";
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
			{/* <TopDestinations /> */}
			<div className="h-8" />
			<AboutSection />
			<div className="h-8" />
			<div className="h-8" />
		</ViewTransition>
	);
}
