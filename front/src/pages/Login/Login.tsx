import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";

export function LoginComponent() {
	const { user, login } = useUserStore();
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	// useEffect(() => {
	// 	if (user) {
	// 		navigate("/");
	// 	}
	// }, [user, navigate]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

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

			if (response.ok) {
				const data = await response.json();
				console.log("data", data);

				login(data.username, data.token);

				navigate("/profile");
			} else {
				console.log("Echec");
			}
		} catch (error) {
			// Gestion des erreurs réseau ou autres exceptions
			console.error("Erreur lors de la tentative de connexion:", error);
		}
	};
	return (
		<div className="flex-1 flex justify-center items-center py-12 px-4">
			<Card className="max-w-sm w-full shadow-lg">
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
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label htmlFor="remember">Remember me</Label>
					</div>
					<Button type="submit" className="mt-4">
						Submit
					</Button>
				</form>
			</Card>
		</div>
	);
}
