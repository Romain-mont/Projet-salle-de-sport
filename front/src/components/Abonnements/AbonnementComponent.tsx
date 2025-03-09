import { ModalConfirmSubscription } from "../ModalInscription/ModalConfirmSub";
import Abonnement from "./Abonnement";
import { useState, useEffect } from "react";

type Subscription = {
	id: number;
	type: string;
	price: number;
};

type AbonnementComponentProps = {
	bouttonChange?: number;
	userId?: number | null;
};

export default function AbonnementComponent({
	bouttonChange = 0,
	userId,
}: AbonnementComponentProps) {
	const [data, setData] = useState<Subscription[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedSubscription, setSelectedSubscription] = useState<{
		id: number;
		type: string;
		price: number;
	} | null>(null);

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

	const handleSelectSubscription = (
		id: number,
		type: string,
		price: number,
	) => {
		setSelectedSubscription({ id, type, price });
		setShowModal(true);
	};

	const handleConfirmSubscription = async () => {
		if (!selectedSubscription || !userId) return;

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${userId}/subscription/${selectedSubscription.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const result = await response.json();

			if (response.ok) {
				// Gérer le succès (redirection, notification, etc.)
				console.log("Abonnement souscrit avec succès !", result);
			} else {
				// Gérer l'erreur
				console.error("Erreur lors de la souscription :", result.message);
				// Afficher un message d'erreur à l'utilisateur
			}
		} catch (error) {
			console.error("Erreur de connexion :", error);
		}

		setShowModal(false);
	};

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="text-4xl md:text-5xl font-bold text-center w-full mb-8 font-['Bebas_Neue']">
				Nos abonnements
			</h1>
			<div className="flex flex-col md:flex-row gap-6 w-full">
				{data.map((sub) => (
					<Abonnement
						key={sub.id}
						id={sub.id}
						type={sub.type}
						price={sub.price}
						bouttonChange={bouttonChange}
						onSelectSubscription={handleSelectSubscription}
					/>
				))}
			</div>
			{selectedSubscription && (
				<ModalConfirmSubscription
					show={showModal}
					onClose={() => setShowModal(false)}
					onConfirm={handleConfirmSubscription}
					subscriptionType={selectedSubscription.type}
					subscriptionPrice={selectedSubscription.price}
				/>
			)}
		</div>
	);
}
