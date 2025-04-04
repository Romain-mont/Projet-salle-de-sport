import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalInscription } from "../../components/ModalInscription/ModalInscription";
import AbonnementComponent from "../../components/Abonnements/AbonnementComponent";
import useAuthStore from "../../store/useAuthStore";
import { translateError } from "../../utils/errorFunction";
import { ModalRecapitulatif } from "../../components/ModalInscription/ModalRecapitulatif";

export function InscriptionComponent() {
	// État local pour le formulaire d'inscription
	const [first_name, setFirstName] = useState<string>("");
	const [last_name, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmedPassword, setConfirmedPassword] = useState<string>("");
	const [agreeTerms, setAgreeTerms] = useState(false);

	// Récupération des données et actions depuis le store
	const reset = useAuthStore((state) => state.reset);
	const currentStep = useAuthStore((state) => {
		return state.currentStep;
	});

	const error = useAuthStore((state) => {
		return state.error;
	});

	const success = useAuthStore((state) => {
		return state.success;
	});

	const setUserId = useAuthStore((state) => state.setUserId);
	const setError = useAuthStore((state) => state.setError);
	const setSuccess = useAuthStore((state) => state.setSuccess);

	// Fonction pour gérer la soumission du formulaire
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Soumission du formulaire d'inscription");

		setError("");
		setSuccess("");

		try {
			if (!agreeTerms) {
				setError("Vous devez accepter les conditions d'utilisation");
				return;
			}

			const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first_name,
					last_name,
					email,
					password,
					confirmedPassword,
				}),
			});

			const data = await response.json();
			console.log("Réponse de l'API:", data);

			if (response.ok) {
				setSuccess("Votre compte a bien été créé");
				setUserId(data.user.id);
				console.log("ID utilisateur défini:", data.user.id);
			} else {
				setError(translateError(data.message));
			}
		} catch (error) {
			setError(
				translateError(
					"Une erreur est survenue lors de la connexion au serveur",
				),
			);
			console.error("Erreur lors de la tentative de connexion:", error);
		}
	};
	useEffect(() => {
		reset();
	}, [reset]);

	return (
		<div className="flex-1 flex flex-col justify-center items-center py-12 px-4">
			<div className="w-full max-w-md mb-4">
				{error && (
					<Alert color="failure" className="mb-4">
						{error}
					</Alert>
				)}
				{success && <ModalInscription />}
			</div>

			<form
				className="flex max-w-md w-full flex-col gap-4"
				onSubmit={(event) => handleSubmit(event)}
			>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="first_name" value="Prénom" />
					</div>
					<TextInput
						id="first_name"
						type="text"
						placeholder="Jean"
						value={first_name}
						onChange={(event) => setFirstName(event.target.value)}
						required
						shadow
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="last_name" value="Nom de famille" />
					</div>
					<TextInput
						id="last_name"
						type="text"
						placeholder="Dupont"
						required
						shadow
						value={last_name}
						onChange={(event) => setLastName(event.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email2" value="Your email" />
					</div>
					<TextInput
						id="email2"
						type="email"
						placeholder="name@flowbite.com"
						required
						shadow
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password2" value="Your password" />
					</div>
					<TextInput
						id="password2"
						type="password"
						required
						shadow
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="repeat-password" value="Repeat password" />
					</div>
					<TextInput
						id="repeat-password"
						type="password"
						required
						shadow
						value={confirmedPassword}
						onChange={(event) => setConfirmedPassword(event.target.value)}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="agree"
						checked={agreeTerms}
						onChange={(e) => setAgreeTerms(e.target.checked)}
						required
					/>
					<Label htmlFor="agree" className="flex">
						J'accepte les&nbsp;
						<Link
							to="#"
							className="text-cyan-600 hover:underline dark:text-cyan-500"
						>
							conditions d'utilisation
						</Link>
					</Label>
				</div>
				{currentStep === 0 && <Button type="submit">S'inscrire</Button>}
				{currentStep === 1 && (
					<div>
						<h1 className="text-4xl md:text-5xl font-bold text-center w-full mb-8 font-['Bebas_Neue']">
							Voici nos formules d'abonnements
						</h1>
						<AbonnementComponent isFromSignup={true} />
					</div>
				)}
				{currentStep === 2 && (
					<div>
						<ModalRecapitulatif
							first_name={first_name}
							last_name={last_name}
							email={email}
						/>
					</div>
				)}
			</form>
		</div>
	);
}
