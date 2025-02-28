import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

export function LoginComponent() {
	return (
		<div className="flex-1 flex justify-center items-center py-12 px-4">
			<Card className="max-w-sm w-full shadow-lg">
				<form className="flex flex-col gap-6 p-6">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email1" value="Your email" />
						</div>
						<TextInput
							id="email1"
							type="email"
							placeholder="name@flowbite.com"
							required
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="password1" value="Your password" />
						</div>
						<TextInput id="password1" type="password" required />
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
