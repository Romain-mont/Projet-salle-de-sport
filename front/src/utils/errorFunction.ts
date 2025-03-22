import { errorTranslations } from "../utils/errorTranslation";

export const translateError = (errorMessage: string | undefined): string => {
	console.log("error", errorMessage);

	// Si pas de message, retourner le message par défaut
	if (!errorMessage) {
		return errorTranslations.default;
	}

	// Si la traduction existe, la retourner
	if (errorTranslations[errorMessage]) {
		return errorTranslations[errorMessage];
	}

	// Pour les messages de validation Joi, essayer de trouver une correspondance partielle
	for (const key in errorTranslations) {
		// Vérifie si la clé est dans le message d'erreur OU si le message d'erreur est dans la clé
		if (errorMessage.includes(key) || key.includes(errorMessage)) {
			return errorTranslations[key];
		}
	}

	// Sinon retourner le message original
	return errorMessage;
};
