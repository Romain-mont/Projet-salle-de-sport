import { Button } from "flowbite-react";

export default function Planning() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Gestion des Cours</h1>

			{/* Formulaire d'ajout de cours */}
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-2xl font-semibold mb-4">
					Ajouter un nouveau cours
				</h2>
				<form className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="titre"
						>
							Titre du cours
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="titre"
							type="text"
							placeholder="Titre du cours"
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="date"
						>
							Date
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="date"
							type="date"
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="heure_debut"
						>
							Heure de début
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="heure_debut"
							type="time"
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="heure_fin"
						>
							Heure de fin
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="heure_fin"
							type="time"
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="salle"
						>
							Salle
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="salle"
							type="text"
							placeholder="Numéro de salle"
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="capacite"
						>
							Capacité maximale
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="capacite"
							type="number"
							placeholder="Nombre de places"
						/>
					</div>
					<div className="col-span-2">
						<Button className="text-sm md:text-base lg:text-lg">
							<span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
								Ajouter le cours
							</span>
						</Button>
					</div>
				</form>
			</div>

			{/* Planning des cours */}
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
				<h2 className="text-2xl font-semibold mb-4">Planning des cours</h2>
				<table className="min-w-full leading-normal">
					<thead>
						<tr>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Date
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Heure
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Cours
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Salle
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Capacité
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{/* Ici, vous mappez vos cours pour les afficher */}
						<tr>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								2023-06-01
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								10:00 - 11:30
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								Yoga débutant
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								Salle 101
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								20/25
							</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<Button className="text-sm md:text-base lg:text-lg">
									<span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
										Modifier
									</span>
								</Button>
								<Button className="text-sm md:text-base lg:text-lg">
									<span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
										Supprimer
									</span>
								</Button>
							</td>
						</tr>
						{/* Répétez pour chaque cours */}
					</tbody>
				</table>
			</div>
		</div>
	);
}
