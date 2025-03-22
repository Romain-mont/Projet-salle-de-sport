export const errorTranslations: Record<string, string> = {
	// Patterns fixes pour les erreurs de validation de mot de passe
	"fails to match the required pattern":
		"Le mot de passe doit contenir au moins une lettre majuscule et un chiffre",
	"Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial":
		"Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial",
	"length must be at least 8 characters":
		"Le mot de passe doit contenir au moins 8 caractères",
	'"confirmedPassword" must be': "Les mots de passe ne correspondent pas",
	"Les mots de passe ne correspondent pas.":
		"Les mots de passe ne correspondent pas",

	// Autres erreurs de validation
	'"email" must be a valid email': "L'adresse email n'est pas valide",
	'"first_name" is not allowed to be empty': "Le prénom ne peut pas être vide",
	'"last_name" is not allowed to be empty':
		"Le nom de famille ne peut pas être vide",

	// Messages d'erreur spécifiques
	"Un utilisateur avec cet email existe déjà.":
		"Un utilisateur avec cet email existe déjà",
	"Email ou mot de passe incorrect.": "Email ou mot de passe incorrect",
	"L'utilisateur n'existe pas.": "L'utilisateur n'existe pas",
	"Vous devez accepter les conditions d'utilisation":
		"Vous devez accepter les conditions d'utilisation",
	"Une erreur est survenue lors de la connexion au serveur":
		"Une erreur est survenue lors de la connexion au serveur",

	// Message par défaut
	default: "Une erreur est survenue",
};
