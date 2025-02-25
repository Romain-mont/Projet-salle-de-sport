import { OffreCard } from "./OffreCard";

export function OffreSalleComponent() {
	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="text-4xl md:text-5xl font-bold text-center w-full mb-8 font-['Bebas_Neue']">
				Retrouvez en salle
			</h1>
			<div className="flex flex-col md:flex-row gap-6 w-full">
				<OffreCard title="Coach en salle" />
				<OffreCard title="Cours collectifs" />
				<OffreCard title="Machines accès libres" />
			</div>
		</div>
	);
}
