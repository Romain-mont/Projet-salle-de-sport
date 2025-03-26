import {
	Button,
	Flowbite,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggle,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "./CustomLink";
import useAuthStore, { useUserStore } from "../../store/useAuthStore";

const customTheme = {
	navbar: {
		link: {
			active: {
				on: "text-[#0077B6] border-b-2 border-[#0077B6]",
				off: "text-sm md:text-base lg:text-lg",
			},
			base: "font-['Poppins'] text-xl border-b-2 border-transparent hover:border-[#0077B6]",
		},
	},
	button: {
		base: "font-['Poppins']",
		color: {
			primary:
				"bg-[#FED703] text-[#3C454D] hover:bg-[#0077B6] hover:text-white",
		},
	},
};

export function ComponentNavBar() {
	const role = useAuthStore((state) => state.role);
	const navigate = useNavigate();
	const { user, logout } = useUserStore();
	console.log("Rôle utilisateur:", role);
	const onLogout = () => {
		logout();
		useAuthStore.getState().setRole("");
		navigate("/");
	};
	const sub = () => {
		navigate("/subscription");
	};
	return (
		<div className="container mx-auto px-4">
			<div className="max-w-screen-xl mx-auto">
				<Flowbite theme={{ theme: customTheme }}>
					<Navbar
						fluid
						rounded
						className="px-2 md:px-4 lg:px-6 fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#0077B6]"
					>
						<NavbarToggle className="md:hidden" />
						<NavbarBrand to="/" className="flex items-center">
							<span className="text-2xl md:text-3xl lg:text-4xl font-['Bebas_Neue']">
								DevFit Studio
							</span>
						</NavbarBrand>

						<div className="flex md:order-2 gap-2 md:gap-4">
							{!user ? (
								<Button
									className="text-sm md:text-base lg:text-lg"
									color="primary"
									onClick={sub}
								>
									<span className="text-xl">S'inscrire</span>
								</Button>
							) : (
								<div className="flex items-center">
									<p className="text-[#0077B6] font-['Poppins'] font-medium">
										Bonjour <span className="font-bold">{user.name}</span>
									</p>
								</div>
							)}
						</div>

						<NavbarCollapse>
							<CustomLink url="/" text="Accueil" />
							<CustomLink url="/abonnement" text="Abonnements" />
							<CustomLink url="/contact" text="Contact" />
							<CustomLink url="/newsletter" text="Newsletter" />
							{role === "teacher" && (
								<CustomLink url="/planning" text="Mon Planning" />
							)}
							{!user ? (
								<CustomLink url="/login" text="Se Connecter" />
							) : (
								<div className="flex flex-col gap-2">
									<CustomLink url="/profile" text="Mon profil" />
									<div className="flex">
										<Button
											color="primary"
											size="sm"
											className="text-xs md:text-sm w-auto inline-block self-start"
											onClick={onLogout}
										>
											Se déconnecter
										</Button>
									</div>
								</div>
							)}
						</NavbarCollapse>
					</Navbar>
				</Flowbite>
			</div>
		</div>
	);
}
