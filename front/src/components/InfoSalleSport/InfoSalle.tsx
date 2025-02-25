import { Button, Card, Flowbite } from "flowbite-react";

const customTheme = {
	button: {
		base: "font-['Poppins']",
		color: {
			primary:
				"bg-[#FED703] text-[#3C454D] hover:bg-[#0077B6] hover:text-white",
		},
	},
};

export function ComponentInfoSalle() {
	return (
		<Flowbite theme={{ theme: customTheme }}>
			<Card className="flex flex-col items-center justify-center">
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-['Bebas_Neue']">
					Retrouvez ici toute notre actualité
				</h5>

				<p className="font-normal text-gray-700 dark:text-gray-400 mt-4 font-['Poppins']">
					Restez informé des dernières tendances fitness, des conseils nutrition
					et des événements sportifs à venir. Notre équipe de coachs
					professionnels partage régulièrement des programmes d'entraînement,
					des recettes healthy et des astuces pour atteindre vos objectifs de
					remise en forme.
				</p>
				<Button color="primary">
					Read more
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						className="-mr-1 ml-2 h-4 w-4"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</Button>
			</Card>
		</Flowbite>
	);
}
