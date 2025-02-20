import { ComponentCarousel } from "../../components/Carousel/Carousel";
import { ComponentFooter } from "../../components/Footer/Footer";
import { ComponentInfoSalle } from "../../components/InfoSalleSport/InfoSalle";

export default function HomePage() {
	return (
		<>
			<div className="container mx-auto px-4">
				<div className="max-w-screen-xl mx-auto flex flex-col gap-8">
					<div className="w-full h-[50vh]">
						<ComponentCarousel />
					</div>
					<div className="bg-slate-500 h-[50vh]">
						<ComponentInfoSalle />
					</div>
				</div>
			</div>
			<ComponentFooter />
		</>
	);
}
