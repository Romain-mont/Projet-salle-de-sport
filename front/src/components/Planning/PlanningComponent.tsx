import { Button } from "flowbite-react";
import type { Course } from "../../@types/types";

type PlanningProps = Course;

export default function PlanningComponent({
	title,
	description,
	date,
	time,
	duration,
	max_participants,
	teacher_id,
}: PlanningProps) {
	return (
		<div className="bg-gray-50 rounded-lg p-4 shadow mb-4">
			<div className="flex justify-between items-center mb-2">
				<span className="font-bold">{title}</span>
				<span className="text-sm text-gray-600">
					<span>{date.toString()}</span>
				</span>
			</div>
			<div className="text-sm mb-2">
				<span className="font-semibold">Horaire:</span> {time}
			</div>
			<div className="text-sm mb-2">
				<span className="font-semibold">Durée:</span> {duration.hours} heure(s)
			</div>
			<div className="text-sm mb-2">
				<span className="font-semibold">Description:</span> {description}
			</div>
			<div className="text-sm mb-3">
				<span className="font-semibold">Capacité:</span> {max_participants}{" "}
				participants
			</div>
			<div className="text-sm mb-3">
				<span className="font-semibold">ID Professeur:</span> {teacher_id}
			</div>
			<div className="flex space-x-2">
				<Button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded">
					Modifier
				</Button>
				<Button className="flex-1 bg-red-500 hover:bg-red-700 text-white text-sm py-2 px-3 rounded">
					Supprimer
				</Button>
			</div>
		</div>
	);
}
