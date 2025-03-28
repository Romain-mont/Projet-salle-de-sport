import bcrypt from "bcrypt";
import Joi from "joi";
import sanitize from "sanitize-html";
import { Users } from "../modele/Associations.js";
import { generateAuthenticationToken } from "../utils/token.js";

const userController = {
	// Récupérer tous les utilisateurs avec leur abonnement
	async index(req, res, next) {
		try {
			const users = await Users.findAll({
				include: "subscription",
				order: [["id", "ASC"]],
			});

			if (users.length === 0) {
				return res.status(404).json({ message: "Aucun utilisateur trouvé." });
			}

			res.json(users);
		} catch (error) {
			console.error(error); // Log de l'erreur pour débogage
			next(error);
		}
	},

	//  Récupérer un utilisateur par ID
	async show(req, res, next) {
		try {
			//  todo valider sur la route avec la regex
			const { id } = req.params;

			const userFound = await Users.findByPk(id, {
				include: "subscription",
			});

			if (!userFound) {
				return res
					.status(404)
					.json({ message: `Utilisateur avec l'ID ${id} non trouvé.` });
			}

			res.json(userFound);
		} catch (error) {
			next(error);
		}
	},

	//  Créer un utilisateur (inscription)
	async store(req, res, next) {
		try {
			//  Nettoyage des données
			const first_name = sanitize(req.body.first_name, {
				allowedTags: [],
			}).trim();
			const last_name = sanitize(req.body.last_name, {
				allowedTags: [],
			}).trim();
			const email = sanitize(req.body.email, { allowedTags: [] }).trim();
			const password = sanitize(req.body.password, { allowedTags: [] }).trim();
			const confirmedPassword = sanitize(req.body.confirmedPassword, {
				allowedTags: [],
			}).trim();

			//  Validation avec Joi
			const createUserSchema = Joi.object({
				first_name: Joi.string().min(2).max(50).required(),
				last_name: Joi.string().min(2).max(50).required(),
				email: Joi.string().email().required(),
				password: Joi.string()
					.min(8)
					.pattern(
						/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
					)
					.required()
					.messages({
						"string.pattern.base":
							"Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial",
					}),
				confirmedPassword: Joi.string()
					.valid(Joi.ref("password"))
					.required()
					.messages({
						"any.only": "Les mots de passe ne correspondent pas.",
					}),
			});
			console.log("conf pass", confirmedPassword);
			const { error } = createUserSchema.validate({
				first_name,
				last_name,
				email,
				password,
				confirmedPassword,
			});

			if (error) {
				return next(error);
			}

			//  Vérifier si l'email existe déjà
			const existingUser = await Users.findOne({ where: { email } });
			if (existingUser) {
				return res
					.status(409)
					.json({ message: "Un utilisateur avec cet email existe déjà." });
			}

			//  Hachage du mot de passe
			// ! utiliser scrypt ou argon2
			const hashedPassword = await bcrypt.hash(password, 12);

			//  Création de l'utilisateur (visiteur par défaut)
			const newUser = await Users.create({
				first_name,
				last_name,
				email,
				password: hashedPassword,
				role: "visitor",
			});

			res.status(201).json({
				message: "Utilisateur créé avec succès, il est actuellement visiteur.",
				user: newUser,
			});
		} catch (error) {
			next(error);
		}
	},

	//  Mettre à jour un utilisateur
	async update(req, res, next) {
		const { id } = req.params;
		const { first_name, last_name, email, password } = req.body;

		try {
			//  Vérification de l'utilisateur
			const userToUpdate = await Users.findByPk(id);
			if (!userToUpdate) {
				return res.status(404).json({ message: "L'utilisateur n'existe pas." });
			}

			//  Validation avec Joi
			const updateUserSchema = Joi.object({
				first_name: Joi.string().min(2).max(50).optional(),
				last_name: Joi.string().min(2).max(50).optional(),
				email: Joi.string().email().optional(),
				password: Joi.string()
					.min(8)
					.pattern(
						/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
					)
					.optional(),
			});

			const { error } = updateUserSchema.validate({
				first_name,
				last_name,
				email,
				password,
			});

			if (error) {
				return next(error);
			}

			//  Vérifier si l'email existe déjà
			if (email && email !== userToUpdate.email) {
				const existingUser = await Users.findOne({ where: { email } });
				if (existingUser) {
					return res
						.status(409)
						.json({ message: "Un utilisateur avec cet email existe déjà." });
				}
			}

			//  Hachage du mot de passe si mis à jour
			let hashedPassword = userToUpdate.password;
			if (password) {
				hashedPassword = await bcrypt.hash(password, 10);
			}

			//  Mise à jour des informations
			const userUpdated = await userToUpdate.update({
				first_name: first_name || userToUpdate.first_name,
				last_name: last_name || userToUpdate.last_name,
				email: email || userToUpdate.email,
				password: hashedPassword,
			});

			res.json({
				message: "Utilisateur mis à jour avec succès.",
				user: userUpdated,
			});
		} catch (error) {
			next(error);
		}
	},

	//  Supprimer un utilisateur
	async destroy(req, res, next) {
		const { id } = req.params;

		try {
			const user = await Users.findByPk(id);
			if (!user) {
				return res.status(404).json({ message: "L'utilisateur n'existe pas." });
			}

			await user.destroy();
			return res.status(204).send();
		} catch (error) {
			next(error);
		}
	},
	async login(req, res, next) {
		const { email, password } = req.body;
		console.log("email", email, "password", password);

		try {
			// Vérifiez si l'utilisateur existe
			const user = await Users.findOne({ where: { email } });

			if (!user) {
				return res
					.status(404)
					.json({ message: "Email ou mot de passe incorrect." });
			}

			//Vérifiez le mot de passe
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return res
					.status(401)
					.json({ message: "Email ou mot de passe incorrect." });
			}

			// Générer un token JWT
			const tokenData = generateAuthenticationToken({
				id: user.id,
				username: user.first_name,
			});

			res.json({
				id: user.id,
				username: user.first_name,
				message: "Connexion réussie.",
				token: tokenData.accessToken.token,
				expiresAt: tokenData.accessToken.expiresAt,
			});
		} catch (error) {
			next(error);
		}
	},
	async getCurrentUser(req, res, next) {
		try {
			const userId = req.user.id;
			const currentUser = await Users.findByPk(userId, {
				include: "subscription",
			});

			if (!currentUser) {
				return res.status(404).json({ message: "Utilisateur non trouvé" });
			}
			res.json(currentUser);
		} catch (error) {
			next(error);
		}
	},
};

export { userController };
