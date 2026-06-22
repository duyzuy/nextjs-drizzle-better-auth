import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export interface HeroSectionProps extends PropsWithChildren {
	className?: string;
	headline?: string;
}
const HeroSection: React.FC<HeroSectionProps> = ({
	headline = "All-in-one Travel Booking.",
	children,
	className,
}) => {
	return (
		<div className={cn("container mx-auto px-4 md:px-6 lg:px-8", className)}>
			<div className="video-wrapper rounded-4xl overflow-hidden aspect-video relative w-full">
				<video
					muted
					autoPlay={true}
					loop={true}
					src="https://gofly-html.netlify.app/assets/video/home4-banner-video.mp4"
					className="absolute inset-0 w-full"
				></video>
				<div className="content relative inset-0 w-full h-full z-2 flex items-center justify-center">
					<p className="text-6xl text-white font-bold">{headline}</p>
				</div>
				{children && <div className="child">{children}</div>}
			</div>
		</div>
	);
};
export default HeroSection;
