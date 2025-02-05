// Import de dotenv pour charger les variables d'environnement depuis le fichier .env
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

export default {
  auth: {
    accessToken: {
      type: "Bearer", // Type de token (généralement Bearer)
      algorithm: process.env.ACCESS_TOKEN_ALGORITHM || "HS256", // Algorithme utilisé pour signer le JWT
      secret: process.env.ACCESS_TOKEN_SECRET || "Acc3ssTok3nS3c3t!", // Clé secrète pour signer les tokens
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN_MS || 3600, // Durée de validité du token en secondes (par défaut : 1 heure)
      audience: process.env.ACCESS_TOKEN_AUDIENCE || "my_backend_api", // Audience du token (à qui il est destiné)
      issuer: process.env.ACCESS_TOKEN_ISSUER || "my_authentication_server", // Émetteur du token (qui l'a généré)
    },
  },
  server: {
    port: process.env.PORT || 3000, // Port sur lequel le serveur écoute
  },
  database: {
    host: process.env.DB_HOST || "localhost", // Hôte de la base de données
    port: process.env.DB_PORT || 5432, // Port de la base de données
    username: process.env.DB_USER || "postgres", // Nom d'utilisateur pour la base de données
    password: process.env.DB_PASSWORD || "password", // Mot de passe pour la base de données
    name: process.env.DB_NAME || "my_database", // Nom de la base de données
  },
};
