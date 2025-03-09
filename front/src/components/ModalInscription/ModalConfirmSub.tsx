import { Button, Modal } from "flowbite-react";

type ConfirmSubscriptionModalProps = {
	show: boolean;
	onClose: () => void;
	onConfirm: () => void;
	subscriptionType: string;
	subscriptionPrice: number;
};

export function ModalConfirmSubscription({
	show,
	onClose,
	onConfirm,
	subscriptionType,
	subscriptionPrice,
}: ConfirmSubscriptionModalProps) {
	return (
		<Modal show={show} onClose={onClose} size="md">
			<Modal.Header className="border-b border-gray-200 !p-6">
				Confirmation d'abonnement
			</Modal.Header>

			<Modal.Body>
				<div className="space-y-4 p-6">
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Êtes-vous sûr de vouloir souscrire à l'abonnement suivant ?
					</p>
					<div className="bg-gray-100 p-4 rounded-lg">
						<h3 className="text-lg font-semibold">{subscriptionType}</h3>
						<p className="text-xl font-bold text-blue-600">
							{subscriptionPrice}€
						</p>
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button color="success" onClick={onConfirm}>
					Confirmer
				</Button>
				<Button color="gray" onClick={onClose}>
					Annuler
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
