import { verifyJwtToken } from "../utils/token.js";

export function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization; // Récupère le header Authorization
	const token = authHeader && authHeader.split(" ")[1]; // Extrait le token après "Bearer"
	console.log("token", token, "authHeader", authHeader);

	if (!token) {
		return res
			.status(401)
			.json({ message: "Accès non autorisé. Aucun token fourni." });
	}

	const decoded = verifyJwtToken(token); // Vérifie et décode le token
	if (!decoded) {
		return res.status(403).json({ message: "Token invalide ou expiré." });
	}

	req.user = decoded; // Stocke les informations du token (id, username, etc.) dans req.user
	next(); // Passe au middleware suivant ou au contrôleur
}
