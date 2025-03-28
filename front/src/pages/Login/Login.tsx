import {
	Alert,
	Button,
	Card,
	Checkbox,
	Label,
	TextInput,
} from "flowbite-react";
import { useState } from "react";
import useAuthStore, { useUserStore } from "../../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export function LoginComponent() {
	const { login } = useUserStore();
	const location = useLocation();
	const message = location.state?.message;
	const navigate = useNavigate();
	const setTeacherId = useAuthStore((state) => state.setTeacherId);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setSuccess("");
		setIsLoading(true);

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();
			if (response.ok) {
				console.log("data", data);

				setSuccess("Connexion réussis");
				login(data.username, data.token);
				setTeacherId(data.id);

				setTimeout(() => navigate("/profile"), 2000);
			} else {
				console.log("Echec");
				setError(data.message || "Mot de passe ou email incorrect");
			}
		} catch (error) {
			// Gestion des erreurs réseau ou autres exceptions
			setError("Erreur de connexion au serveur.Veuillez réessayer.");
			console.error("Erreur lors de la tentative de connexion:", error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex-1 flex flex-col justify-center items-center py-12 px-4">
			{message && (
				<div
					className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 w-full max-w-sm"
					role="alert"
				>
					<span className="block sm:inline">{message}</span>
				</div>
			)}
			<Card className="max-w-sm w-full shadow-lg">
				{error && (
					<Alert color="failure" className="mb-4">
						{error}
					</Alert>
				)}
				{success && (
					<Alert color="success" className="mb-4">
						{success}
					</Alert>
				)}
				<form
					className="flex flex-col gap-6 p-6"
					method="post"
					onSubmit={(event) => handleSubmit(event)}
				>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email1" value="Your email" />
						</div>
						<TextInput
							id="email1"
							type="email"
							name="email"
							placeholder="name@flowbite.com"
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							disabled={isLoading}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="password1" value="Your password" />
						</div>
						<TextInput
							id="password1"
							type="password"
							name="password"
							required
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							disabled={isLoading}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label htmlFor="remember">Remember me</Label>
					</div>
					<Button type="submit" className="mt-4" disabled={isLoading}>
						{isLoading ? (
							<div className="flex items-center justify-center gap-2">
								<BeatLoader size={8} color="#ffffff" loading={isLoading} />
								<span>Connexion en cours...</span>
							</div>
						) : (
							"Se connecter"
						)}
					</Button>
				</form>
			</Card>
		</div>
	);
}
