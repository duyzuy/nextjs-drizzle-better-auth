"use client";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export interface TopDestinationProps {
	className?: string;
}

const TopDestinations: React.FC<TopDestinationProps> = () => {
	const destinations = [
		{
			thumbnail: "/assets/images/image-50.webp",
			title: "Jordan",
			tourCount: 4,
		},
		{
			thumbnail: "/assets/images/image-51.webp",
			title: "Canada",
			tourCount: 4,
		},
		{
			thumbnail: "/assets/images/image-52.webp",
			title: "Jamaica",
			tourCount: 4,
		},
		{
			thumbnail: "/assets/images/image-53.webp",
			title: "Quota",
			tourCount: 4,
		},
		{
			thumbnail: "/assets/images/image-54.webp",
			title: "United States",
			tourCount: 4,
		},
		{
			thumbnail: "/assets/images/image-55.webp",
			title: "Oman",
			tourCount: 4,
		},
		{
			thumbnail: "/assets/images/image-56.webp",
			title: "Saudi Aria",
			tourCount: 4,
		},
	];
	return (
		<div className="top-destinations">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="text-center mb-6">
					<h3 className="text-3xl font-bold">Top Destinations</h3>
				</div>
				<div>
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y]}
						spaceBetween={50}
						slidesPerView={4}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: true }}
						// onSwiper={(swiper) => console.log(swiper)}
						// onSlideChange={() => console.log("slide change")}
						className="pb-12!"
					>
						{destinations.map((destination) => (
							<SwiperSlide key={destination.title}>
								<div className="destination-box flex flex-col gap-4">
									<div className="destination-box__thumbnail aspect-9/12 rounded-3xl overflow-hidden">
										<Image
											src={destination.thumbnail}
											alt={destination.title}
											width={900}
											height={900}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="destination-box__content text-center">
										<h4 className="font-semibold text-xl">
											{destination.title}
										</h4>
										<div className="text-center">
											<span>{`${destination.tourCount} tours`}</span>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
};
export default TopDestinations;
