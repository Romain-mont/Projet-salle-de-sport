import { Button } from "flowbite-react";

type InfoAbonnement = {
	id: number;
	type: string;
	price: number;
	bouttonChange: number;
	onSelectSubscription: (id: number, type: string, price: number) => void;
};

export default function Abonnement({
	id,
	type,
	price,
	bouttonChange,
	onSelectSubscription,
}: InfoAbonnement) {
	return (
		<div className="w-full md:flex-1 bg-[#3C454D] rounded-[15px] p-6 flex flex-col">
			<h2 className="text-2xl font-bold text-white mb-4">{type}</h2>

			<div className="w-full h-48 bg-gray-600 rounded-lg mb-6 flex items-center justify-center">
				<div className="text-center bg-[#0077B6] py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
					<span className="text-5xl font-bold text-white">{price}€</span>
				</div>
			</div>

			<div className="mt-auto">
				{bouttonChange === 0 && (
					<Button color="primary" className="w-full text-lg py-3">
						S'abonner maintenant
					</Button>
				)}
				{bouttonChange === 1 && (
					<Button
						color="success"
						className="w-full text-lg py-3"
						onClick={() => onSelectSubscription(id, type, price)}
					>
						Choisir cette formule
					</Button>
				)}
			</div>
		</div>
	);
}
