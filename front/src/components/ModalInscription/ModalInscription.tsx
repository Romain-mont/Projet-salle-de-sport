import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export function ModalInscription() {
	console.log("ModalInscription rendu");

	const [openModal, setOpenModal] = useState(true);
	const navigate = useNavigate();

	// Récupération de l'action setCurrentStep depuis le store
	const setCurrentStep = useAuthStore((state) => {
		console.log("Sélecteur setCurrentStep appelé");
		return state.setCurrentStep;
	});

	const handleContinue = () => {
		console.log("Continuation vers l'étape des abonnements");
		setOpenModal(false);
		setCurrentStep(1);
	};

	const handleClose = () => {
		console.log("Fermeture de la modale et redirection vers login");
		setOpenModal(false);
		navigate("/login");
	};

	return (
		<Modal show={openModal} onClose={handleClose} size="md">
			<Modal.Header className="border-b border-gray-200 !p-6 text-center">
				<div className="flex w-full justify-center items-center">
					<HiCheckCircle className="h-12 w-12 text-green-500 mb-2" />
				</div>
			</Modal.Header>

			<Modal.Body>
				<div className="space-y-4 p-6 text-center">
					<h3 className="text-xl font-medium text-gray-900 dark:text-white">
						Inscription réussie !
					</h3>
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Nous vous remercions pour votre inscription. Votre compte a bien été
						créé !
					</p>
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Poursuivez pour découvrir nos offres d'abonnement et profiter de
						toutes les fonctionnalités.
					</p>
				</div>
			</Modal.Body>

			<Modal.Footer className="flex justify-center gap-4">
				<Button color="success" onClick={handleContinue}>
					Poursuivre l'inscription
				</Button>
				<Button color="gray" onClick={handleClose}>
					Plus tard
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
