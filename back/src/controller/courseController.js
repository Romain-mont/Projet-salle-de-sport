import { Course, Users } from "../modele/Associations.js";
import sanitize from "sanitize-html";
import Joi from "joi";

const courseController = {
    async index(req, res,){
        try {
            const course = await Course.findAll();

            if (course.length === 0) {
                return res.status(404).json({ message: "Aucun abonnement trouvé." });
            }
            res.json(course);
        } catch (error) {
            next(error);
        }
    },
    async show(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const courseFound = await Course.findByPk(id);

            if (!courseFound) {
                return res.status(404).json({ message: `Abonnement avec l'ID ${id} non trouvé.` });
            }

            res.json(courseFound);
        } catch (error) {
            next(error);
        }
    },
    async store(req, res, next) {
        try {
            // Sanitize and extract input data
            const title = sanitize(req.body.title, { allowedTags: [] }).trim();
            const description = sanitize(req.body.description, { allowedTags: [] }).trim();
            const date = sanitize(req.body.date, { allowedTags: [] }).trim();
            const time = sanitize(req.body.time, { allowedTags: [] }).trim();
            const duration = sanitize(req.body.duration, { allowedTags: [] }).trim();
            const teacher_id = parseInt(req.body.teacher_id, 10);
            const max_participants = parseInt(req.body.max_participants, 10);

            // Validate input data using Joi
            const createCourseSchema = Joi.object({
                title: Joi.string().min(5).max(50).required(),
                description: Joi.string().min(10).max(100).required(),
                date: Joi.date().iso().required(), // ISO format for date validation
                time: Joi.string()
                    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
                    .required(), // HH:mm:ss format
                duration: Joi.string()
                    .pattern(/^\d+ (hour|minute|day)s?(\s\d+ (minute|second)s?)?$/), // Interval format
                teacher_id: Joi.number().integer().positive().required(),
                max_participants: Joi.number().integer().min(1).required(), // New validation
            });

            // Validate the request body against the schema
            const { error } = createCourseSchema.validate({
                title,
                description,
                date,
                time,
                duration,
                teacher_id,
                max_participants,
            });

            if (error) {
                return res.status(400).json({
                    message: `Validation error: ${error.details.map((err) => err.message).join(", ")}`,
                });
            }

            // Verify if the teacher exists
            const teacher = await Users.findByPk(teacher_id);
            if (!teacher || teacher.role !== "teacher") {
                return res.status(404).json({ message: `Teacher with ID ${teacher_id} not found or is not a teacher.` });
            }

            // Create the course
            const newCourse = await Course.create({
                title,
                description,
                date,
                time,
                duration,
                teacher_id,
                max_participants,
            });

            res.status(201).json({
                message: "Course created successfully",
                course: newCourse,
            });
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
        const { id } = req.params;
        const { title, description, date, time, duration, teacher_id, max_participants } = req.body;

        try {
            const courseToUpdate = await Course.findByPk(id);
            
            if (!courseToUpdate) {
                return res.status(404).json({ message: "Le cours n'existe pas." });
            }

            const updateCourseSchema = Joi.object({
                title: Joi.string().min(5).max(50),
                description: Joi.string().min(10).max(100),
                date: Joi.date().iso(),
                time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
                duration: Joi.string()
                    .pattern(/^\d+ (hour|minute|day)s?(\s\d+ (minute|second)s?)?$/),
                teacher_id: Joi.number().integer().positive(),
                max_participants: Joi.number().integer().min(1), // New validation
            });

            // Validate the request body against the schema
            const { error } = updateCourseSchema.validate({
                title,
                description,
                date,
                time,
                duration,
                teacher_id,
                max_participants,
            });

            if (error) {
                return res.status(400).json({
                    message: `Validation error: ${error.details.map((err) => err.message).join(", ")}`,
                });
            }

            // Update the course
            const courseUpdated = await courseToUpdate.update({
                title: title || courseToUpdate.title,
                description: description || courseToUpdate.description,
                date: date || courseToUpdate.date,
                time: time || courseToUpdate.time,
                duration: duration || courseToUpdate.duration,
                teacher_id: teacher_id || courseToUpdate.teacher_id,
                max_participants:
                    max_participants !== undefined ? max_participants : courseToUpdate.max_participants, // Update max participants only if provided
            });

            res.json({ message: "Abonnement mis à jour avec succès", subscription: courseUpdated });
        } catch (error) {
            next(error);
        }
    },

    async destroy(req, res, next) {
        const { id } = req.params;

        try {
            const course = await Course.findByPk(id);

            if (!course) {
                return res.status(404).json({ message: "Le cours n'existe pas." });
            }

            await course.destroy();
            
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    },
};


export {courseController}