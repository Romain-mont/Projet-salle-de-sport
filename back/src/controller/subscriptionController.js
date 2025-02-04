import { Subscription, Users } from "../modele/Associations.js";
import sanitize from "sanitize-html";
import Joi from "joi";

const subscriptionController = {
    //  Récupérer tous les abonnements avec les infos de l'utilisateur associé
    async index(req, res, next) {
        try {
            const subscriptions = await Subscription.findAll();

            if (subscriptions.length === 0) {
                return res.status(404).json({ message: "Aucun abonnement trouvé." });
            }
            res.json(subscriptions);
        } catch (error) {
            next(error);
        }
    },

    //  Récupérer un abonnement par ID avec les infos de l'utilisateur
    async show(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const subscriptionFound = await Subscription.findByPk(id, {
                include: {
                    association: "subscribers", // Alias défini dans l'association
                    attributes: ["id", "first_name", "last_name", "email"], // Champs spécifiques pour Users
                },
            });
            if (!subscriptionFound) {
                return res.status(404).json({ message: `Abonnement avec l'ID ${id} non trouvé.` });
            }

            res.json(subscriptionFound);
        } catch (error) {
            next(error);


        }
    },
    async getAllSubscriptionsWithUsers(req, res, next) {
        try {
            // Récupérer tous les abonnements avec leurs utilisateurs associés
            const subscriptions = await Subscription.findAll({
                include: "subscribers", // Utilisation directe de l'alias défini dans l'association
                order: [["id", "ASC"]],
            });
    
            if (subscriptions.length === 0) {
                return res.status(404).json({ message: "Aucun abonnement trouvé." });
            }
    
            res.json(subscriptions); // Retourner directement les abonnements avec leurs utilisateurs
        } catch (error) {
            next(error);
        }
    }
    ,
    //  Créer un abonnement
    async store(req, res, next) {
        try {
            // Nettoyage des données
            const type = sanitize(req.body.type, { allowedTags: [] }).trim();
            const price = parseFloat(req.body.price); // Vérification avant sanitize()
            const start_date = sanitize(req.body.start_date, { allowedTags: [] }).trim();
            const end_date = sanitize(req.body.end_date, { allowedTags: [] }).trim();
    
            // Définition du schéma de validation avec Joi
            const createSubscriptionSchema = Joi.object({
                type: Joi.string().required(),
                price: Joi.number().positive().required(),
                start_date: Joi.date().required(),
                end_date: Joi.date().greater(Joi.ref("start_date")).required(),
            });
    
            // Validation des données
            const { error } = createSubscriptionSchema.validate({ type, price, start_date, end_date });
    
            if (error) {
                return res.status(400).json({ message: `Validation error: ${error.details.map(err => err.message).join(", ")}` });
            }
    
            // Création de l'abonnement
            const newSubscription = await Subscription.create({ type, price, start_date, end_date });
    
            res.status(201).json({ message: "Abonnement créé avec succès", subscription: newSubscription });
        } catch (error) {
            next(error);
        }
    },

    //  Mettre à jour un abonnement
    async update(req, res, next) {
        const { id } = req.params;
        const { type, price, start_date, end_date } = req.body;

        try {
            //  Vérification si l'abonnement existe
            const subscriptionToUpdate = await Subscription.findByPk(id);
            if (!subscriptionToUpdate) {
                return res.status(404).json({ message: "L'abonnement n'existe pas." });
            }

            //  Validation des nouvelles valeurs
            const updateSubscriptionSchema = Joi.object({
                type: Joi.string().valid("mensuel", "annuel", "sans engagement").optional(),
                price: Joi.number().positive().optional(),
                start_date: Joi.date().optional(),
                end_date: Joi.date().greater(Joi.ref("start_date")).optional()
            });

            const { error } = updateSubscriptionSchema.validate({ type, price, start_date, end_date });

            if (error) {
                return res.status(400).json({ message: `Validation error: ${error.details.map(err => err.message).join(", ")}` });
            }

            //  Mise à jour de l'abonnement
            const subscriptionUpdated = await subscriptionToUpdate.update({
                type: type || subscriptionToUpdate.type,
                price: price || subscriptionToUpdate.price,
                start_date: start_date || subscriptionToUpdate.start_date,
                end_date: end_date || subscriptionToUpdate.end_date
            });

            res.json({ message: "Abonnement mis à jour avec succès", subscription: subscriptionUpdated });

        } catch (error) {
            next(error);
        }
    },

    //  Supprimer un abonnement
    async destroy(req, res, next) {
        const { id } = req.params;

        try {
            const subscription = await Subscription.findByPk(id);
            if (!subscription) {
                return res.status(404).json({ message: "L'abonnement n'existe pas." });
            }

            await subscription.destroy();
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    },

    //  Associer un utilisateur à un abonnement
    async subscribeUser(req, res, next) {
        try {
            const { userId, subscriptionId } = req.params;
    
            // Vérification de l'utilisateur
            const user = await Users.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: `Utilisateur avec l'ID ${userId} non trouvé.` });
            }
    
            // Vérification de l'abonnement
            const subscription = await Subscription.findByPk(subscriptionId);
            if (!subscription) {
                return res.status(404).json({ message: `Abonnement avec l'ID ${subscriptionId} non trouvé.` });
            }
    
            // Vérification si l'utilisateur a déjà un abonnement actif
            if (user.subscription_id) {
                return res.status(409).json({ message: "L'utilisateur a déjà un abonnement actif." });
            }
    
            // Mise à jour de l'utilisateur avec l'ID de l'abonnement
            await user.update({ subscription_id: subscription.id, role: "subscriber" });
    
            res.status(200).json({
                message: "Abonnement souscrit avec succès. L'utilisateur est maintenant abonné.",
                user,
                subscription,
            });
        } catch (error) {
            next(error);
        }
    },
    async updateUserSubscription(req, res, next) {
        try {
            const { userId, subscriptionId } = req.params;
    
            // Vérification de l'utilisateur
            const user = await Users.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: `Utilisateur avec l'ID ${userId} non trouvé.` });
            }
    
            // Vérification du nouvel abonnement
            const newSubscription = await Subscription.findByPk(subscriptionId);
            if (!newSubscription) {
                return res.status(404).json({ message: `Abonnement avec l'ID ${subscriptionId} non trouvé.` });
            }
    
            // Mise à jour de l'utilisateur avec le nouvel abonnement
            await user.update({ subscription_id: newSubscription.id });
    
            res.status(200).json({
                message: "Abonnement modifié avec succès.",
                user,
                newSubscription,
            });
        } catch (error) {
            next(error);
        }
    },
    async removeUserSubscription(req, res, next) {
        try {
            const { id } = req.params;
    
            // Vérification de l'utilisateur
            const user = await Users.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: `Utilisateur avec l'ID ${id} non trouvé.` });
            }
    
            // Vérification si l'utilisateur a un abonnement actif
            if (!user.subscription_id) {
                return res.status(400).json({ message: "L'utilisateur n'a pas d'abonnement actif." });
            }
    
            // Suppression de l'abonnement (désabonner)
            await user.update({ subscription_id: null, role: "visitor" });
    
            res.status(200).json({
                message: "L'utilisateur a été désabonné avec succès.",
                user,
            });
        } catch (error) {
            next(error);
        }
    }

}    

export { subscriptionController };