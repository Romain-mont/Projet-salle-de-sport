import AbonnementComponent from "../components/Abonnements/AbonnementComponent";
import { ComponentCarousel } from "../components/Carousel/Carousel";
import { ComponentFooter } from "../components/Footer/Footer";
import { ComponentInfoSalle } from "../components/InfoSalleSport/InfoSalle";
import { OffreSalleComponent } from "../components/Offres/OffresSalleComponent";

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="container mx-auto px-4">
					<div className="max-w-screen-xl mx-auto flex flex-col gap-8 py-8">
						<section className="w-full h-[50vh]">
							<ComponentCarousel />
						</section>

						<section className="h-[50vh]">
							<ComponentInfoSalle />
						</section>

						<section>
							<OffreSalleComponent />
						</section>
						<section>
							<AbonnementComponent />
						</section>
					</div>
				</div>
			</main>

			<ComponentFooter />
		</div>
	);
}
