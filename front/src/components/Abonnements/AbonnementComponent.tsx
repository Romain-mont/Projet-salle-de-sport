import Abonnement from "./Abonnement";
import { useState, useEffect } from "react";

type Subscription = {
	id: number;
	type: string;
	price: number;
};

export default function AbonnementComponent() {
	const [data, setData] = useState<Subscription[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/subscription`,
				);
				const data = await response.json();
				setData(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);
	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="text-4xl md:text-5xl font-bold text-center w-full mb-8 font-['Bebas_Neue']">
				Nos abonnements
			</h1>
			<div className="flex flex-col md:flex-row gap-6 w-full">
				{data.map((sub) => (
					<Abonnement key={sub.id} type={sub.type} price={sub.price} />
				))}
			</div>
		</div>
	);
}
