import { useEffect } from "react";
import { Button } from "flowbite-react";
import useAuthStore from "../../store/useAuthStore";
import PlanningComponent from "../../components/Planning/PlanningComponent";

export default function Planning() {
	// Utiliser teacherCourse au lieu de course
	const teacherCourse = useAuthStore((state) => state.teacherCourse);
	const fetchTeacherCourse = useAuthStore((state) => state.fetchTeacherCourse);

	useEffect(() => {
		console.log("fonction");
		// Utiliser fetchTeacherCourse au lieu de fetchCourse
		fetchTeacherCourse();
	}, [fetchTeacherCourse]);

	return (
		<div className="container mx-auto px-4 py-8 pt-20">
			<h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
				Gestion des Cours
			</h1>

			{/* Formulaire d'ajout de cours */}
			<div className="bg-white shadow-md rounded px-4 sm:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8 mb-6">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
					Ajouter un nouveau cours
				</h2>
				<form className="grid grid-cols-1 gap-4">
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="title"
						>
							Titre du cours
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="title"
							name="title"
							type="text"
							placeholder="Titre du cours"
							required
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="description"
							name="description"
							placeholder="Description du cours"
							required
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
							name="date"
							type="date"
							required
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="time"
						>
							Heure de début
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="time"
							name="time"
							type="time"
							required
						/>
					</div>
					<div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="max_participants"
						>
							Capacité maximale
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="max_participants"
							name="max_participants"
							type="number"
							placeholder="Nombre de places"
							required
						/>
					</div>
					<div className="mt-2">
						<Button
							type="submit"
							className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Ajouter le cours
						</Button>
					</div>
				</form>
			</div>

			{/* Liste des cours */}
			<div className="bg-white shadow-md rounded px-4 sm:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
					Planning des cours
				</h2>
				<div className="block space-y-4">
					{teacherCourse && teacherCourse.length > 0 ? (
						teacherCourse.map((lesson) => (
							<PlanningComponent key={lesson.id} {...lesson} />
						))
					) : (
						<p>Aucun cours disponible</p>
					)}
				</div>
			</div>
		</div>
	);
}
