import { useEffect } from "react";
import { ModalConfirmSubscription } from "../ModalInscription/ModalConfirmSub";
import Abonnement from "./Abonnement";
import useAuthStore from "../../store/useAuthStore";

export default function AbonnementComponent() {
	// Récupération des données et actions depuis le store
	const subscriptions = useAuthStore((state) => {
		return state.subscriptions;
	});
	const selectedSubscription = useAuthStore((state) => {
		return state.selectedSubscription;
	});
	const showSubscriptionModal = useAuthStore((state) => {
		return state.showSubscriptionModal;
	});
	const fetchSubscriptions = useAuthStore((state) => state.fetchSubscriptions);
	const selectSubscription = useAuthStore((state) => state.selectSubscription);
	const setShowSubscriptionModal = useAuthStore(
		(state) => state.setShowSubscriptionModal,
	);
	const subscribeUser = useAuthStore((state) => state.subscribeUser);

	// Chargement des abonnements au montage du composant
	useEffect(() => {
		console.log("useEffect: Chargement des abonnements");
		fetchSubscriptions();
	}, [fetchSubscriptions]);

	// Fonction pour sélectionner un abonnement
	const handleSelectSubscription = (
		id: number,
		type: string,
		price: number,
	) => {
		console.log(
			`handleSelectSubscription appelé avec id: ${id}, type: ${type}, price: ${price}`,
		);
		selectSubscription({ id, type, price });
	};

	console.log("État actuel:", {
		subscriptions,
		selectedSubscription,
		showSubscriptionModal,
	});

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="text-4xl md:text-5xl font-bold text-center w-full mb-8 font-['Bebas_Neue']">
				Nos abonnements
			</h1>
			<div className="flex flex-col md:flex-row gap-6 w-full">
				{subscriptions.map((sub) => (
					<Abonnement
						key={sub.id}
						id={sub.id}
						type={sub.type}
						price={sub.price}
						bouttonChange={1}
						onSelectSubscription={handleSelectSubscription}
					/>
				))}
			</div>
			{selectedSubscription && (
				<ModalConfirmSubscription
					show={showSubscriptionModal}
					onClose={() => {
						console.log("Fermeture de la modale de confirmation");
						setShowSubscriptionModal(false);
					}}
					onConfirm={() => {
						console.log("Confirmation de l'abonnement");
						subscribeUser();
					}}
					subscriptionType={selectedSubscription.type}
					subscriptionPrice={selectedSubscription.price}
				/>
			)}
		</div>
	);
}
