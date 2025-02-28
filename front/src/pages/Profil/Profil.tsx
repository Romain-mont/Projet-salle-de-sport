export function ProfileComponent() {
	return (
		<div className="flex justify-center items-center py-12 px-4">
			<div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
				{/* Banner et photo de profil */}
				<div className="relative">
					<div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
						<div className="absolute inset-0 flex items-end justify-end p-4">
							<p className="text-white text-opacity-80 text-sm font-light">
								Développeur depuis 2023
							</p>
						</div>
					</div>
					<div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
						<div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-gray-100">
							<img
								src="https://via.placeholder.com/128"
								// biome-ignore lint/a11y/noRedundantAlt: <explanation>
								alt="Photo de profil"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</div>

				{/* Informations du profil */}
				<div className="pt-20 pb-8 px-6 text-center">
					<h1 className="text-2xl font-bold text-gray-800">Romain Dupont</h1>
					<p className="text-gray-600 mt-1">Développeur Web Full Stack</p>

					<div className="mt-8 border-t border-gray-200 pt-6">
						<div className="grid grid-cols-1 gap-6">
							<div className="flex flex-col">
								<span className="text-sm text-gray-500 font-medium">
									Prénom
								</span>
								<span className="text-gray-800 font-semibold mt-1">Romain</span>
							</div>

							<div className="flex flex-col">
								<span className="text-sm text-gray-500 font-medium">Nom</span>
								<span className="text-gray-800 font-semibold mt-1">Dupont</span>
							</div>

							<div className="flex flex-col">
								<span className="text-sm text-gray-500 font-medium">Rôle</span>
								<span className="text-gray-800 font-semibold mt-1">
									Développeur Web Full Stack
								</span>
							</div>

							<div className="flex flex-col">
								<span className="text-sm text-gray-500 font-medium">Email</span>
								<span className="text-gray-800 font-semibold mt-1">
									romain.dupont@example.com
								</span>
							</div>
						</div>
					</div>

					<div className="mt-8">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 ease-in-out">
							Modifier le profil
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
