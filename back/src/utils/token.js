import jwt from "jsonwebtoken";
import config from "../config.js";

// Extraire les paramètres du fichier de configuration
const { algorithm, audience, expiresIn, issuer, secret } = config.auth.accessToken;

/**
 * Génère un token JWT pour un utilisateur donné.
 * @param {Object} payload - Les données à inclure dans le token (ex : id, username).
 * @returns {string} - Le token JWT signé.
 */

export function generateJwtToken(payload) {

    return jwt.sign(payload, secret, {
        algorithm,
        audience,
        expiresIn, // Vérifiez que cette valeur est correcte
        issuer,
    });
}
/**
 * Vérifie et décode un token JWT.
 * @param {string} token - Le token JWT à vérifier.
 * @returns {Object|null} - Les données décodées si le token est valide, sinon null.
 */
export function verifyJwtToken(token) {
    try {
        return jwt.verify(token, secret, {
            algorithms: [algorithm],
            audience,
            issuer,
        });
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error.message);
        return null;
    }
}

/**
 * Crée une date d'expiration basée sur la durée définie dans la configuration.
 * @param {number} expiresInMS - Durée d'expiration en millisecondes.
 * @returns {string} - Date d'expiration au format ISO.
 */
export function createExpirationDate(expiresInMS) {
    const expirationDate = new Date(Date.now() + expiresInMS * 1000);
    return expirationDate.toISOString();
}

/**
 * Génère un objet contenant le token d'authentification et ses métadonnées.
 * @param {Object} user - Les informations de l'utilisateur (ex : id, username).
 * @returns {Object} - Objet contenant le token et ses métadonnées.
 */
export function generateAuthenticationToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    };

    return {
        accessToken: {
            token: generateJwtToken(payload),
            type: "Bearer",
            expiresAt: createExpirationDate(expiresIn), // Date d'expiration
            expiresInMS: expiresIn, // Durée en millisecondes
        },
    };
}
