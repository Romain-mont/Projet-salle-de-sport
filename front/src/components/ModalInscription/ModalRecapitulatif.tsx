import { Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useState } from "react";

export function ModalRecapitulatif({
	first_name,
	last_name,
	email,
}: {
	first_name: string;
	last_name: string;
	email: string;
}) {
	const [openModal, setOpenModal] = useState(true);
	const navigate = useNavigate();
	const selectedSubscription = useAuthStore(
		(state) => state.selectedSubscription,
	);

	const handleConfirm = () => {
		console.log("Inscription finalisée");
		setOpenModal(false);
		// Rediriger vers la page d'accueil ou le tableau de bord
		navigate("/login", {
			state: {
				message: `Inscription validée ${first_name}! Vous pouvez maintenant vous connecter.`,
			},
		});
	};

	const handleModify = () => {
		setOpenModal(false);
		useAuthStore.getState().setCurrentStep(1);
	};

	return (
		<Modal show={openModal} onClose={handleModify} size="md">
			<Modal.Header className="border-b border-gray-200 !p-6">
				Récapitulatif de votre inscription
			</Modal.Header>

			<Modal.Body>
				<div className="space-y-6 p-4">
					<div>
						<h3 className="text-lg font-semibold mb-2">
							Informations personnelles
						</h3>
						<p className="mb-1">
							<span className="font-medium">Nom :</span> {last_name}
						</p>
						<p className="mb-1">
							<span className="font-medium">Prénom :</span> {first_name}
						</p>
						<p className="mb-1">
							<span className="font-medium">Email :</span> {email}
						</p>
					</div>

					{selectedSubscription && (
						<div>
							<h3 className="text-lg font-semibold mb-2">Abonnement choisi</h3>
							<div className="bg-blue-50 p-3 rounded-md">
								<p className="mb-1">
									<span className="font-medium">Type :</span>{" "}
									{selectedSubscription.type}
								</p>
								<p className="mb-1">
									<span className="font-medium">Prix :</span>{" "}
									{selectedSubscription.price}€
								</p>
							</div>
						</div>
					)}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button color="success" onClick={handleConfirm}>
					Confirmer et finaliser
				</Button>
				<Button color="gray" onClick={handleModify}>
					Modifier l'abonnement
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
