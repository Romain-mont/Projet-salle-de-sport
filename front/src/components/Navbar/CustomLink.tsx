import { NavbarLink } from "flowbite-react";

import { NavLink } from "react-router-dom";

type CustomLinks = {
	url: string;
	text: string;
};

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

export function CustomLink({ url, text }: CustomLinks) {
	return (
		<NavbarLink as="div">
			<NavLink
				to={url}
				className={({ isActive }) =>
					isActive
						? customTheme.navbar.link.active.on
						: customTheme.navbar.link.active.off
				}
			>
				{text}
			</NavLink>
		</NavbarLink>
	);
}
