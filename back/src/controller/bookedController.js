import Joi from "joi";
import sanitize from "sanitize-html";
import {
	Course,
	CourseUserReservation,
	Users,
} from "../modele/Associations.js";

const bookedController = {
	async listParticipantsByCourse(req, res, next) {
		const { id } = req.params;
		// ! error ?
		try {
			// todo : aller chercher les participants directement
			// Users.findParticipants({where: cours_id: id})
			const participants = await Course.findByPk(id, {
				include: "participants",
			});
			// todo : valider les participants, pas la course
			if (participants.length === 0) {
				return res
					.status(404)
					.json({ message: "Aucun participant trouvé pour ce cours." });
			}

			res.json(participants);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		const { course_id, user_id } = req.body;

		try {
			// Vérifiez si le cours existe
			const course = await Course.findByPk(course_id);
			if (!course) {
				return res.status(404).json({ message: "Cours non trouvé." });
			}

			// Vérifiez si l'utilisateur existe
			const user = await Users.findByPk(user_id);
			if (!user) {
				return res.status(404).json({ message: "Utilisateur non trouvé." });
			}

			// Vérifiez si l'utilisateur est déjà inscrit à ce cours
			const existingReservation = await CourseUserReservation.findOne({
				where: { course_id, user_id },
			});

			if (existingReservation) {
				return res
					.status(400)
					.json({ message: "Vous êtes déjà inscrit à ce cours." });
			}

			// Vérifiez si le cours a encore des places disponibles
			// ? avoir une fonctionnalité pour ne pas réserver si la course est déjà complète : le user ne devrait pas pouvoir pas cliquer dessus dans le front
			const reservationCount = await CourseUserReservation.count({
				where: { course_id },
			});
			if (reservationCount >= course.max_participants) {
				return res.status(400).json({ message: "Le cours est complet." });
			}

			// Créez la réservation
			const reservation = await CourseUserReservation.create({
				course_id,
				user_id,
				reservation_date: new Date(),
			});

			res.status(201).json({
				message: "Réservation effectuée avec succès.",
				reservation,
			});
		} catch (error) {
			next(error);
		}
	},
	async destroy(req, res, next) {
		const { reservation_id } = req.params;

		try {
			// Vérifiez si la réservation existe
			const reservation = await CourseUserReservation.findByPk(reservation_id);
			if (!reservation) {
				return res.status(404).json({ message: "Réservation non trouvée." });
			}

			// Supprimez la réservation
			await reservation.destroy();

			res.status(200).json({ message: "Réservation annulée avec succès." });
		} catch (error) {
			next(error);
		}
	},
};

export { bookedController };
