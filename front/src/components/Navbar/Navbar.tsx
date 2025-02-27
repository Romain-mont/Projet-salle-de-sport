import {
	Button,
	Flowbite,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggle,
} from "flowbite-react";

import { CustomLink } from "./CustomLink";

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
							<Button
								className="text-sm md:text-base lg:text-lg"
								color="primary"
							>
								<span className="text-xl">S'inscrire</span>
							</Button>
						</div>

						<NavbarCollapse>
							<CustomLink url="/" text="Accueil" />
							<CustomLink url="/subscribtion" text="Abonnements" />
							<CustomLink url="/Contact" text="Contact" />
							<CustomLink url="/Newsletter" text="Newsletter" />
							<CustomLink url="/connect" text="Se Connecter" />
						</NavbarCollapse>
					</Navbar>
				</Flowbite>
			</div>
		</div>
	);
}
