import jwt from "jsonwebtoken";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJCb2IiLCJpYXQiOjE3Mzg3NTE0NzAsImV4cCI6MTczODc1MTQ3MywiYXVkIjoibXlfYmFja2VuZF9hcGkiLCJpc3MiOiJteV9hdXRoZW50aWNhdGlvbl9zZXJ2ZXIifQ.FnJk6UIRRXsYmsWUUdVsUSkfHHMT1fPFYvvBLODZCs8"; // Votre token
const decoded = jwt.decode(token);

export function generateJwtToken(payload) {
    return jwt.sign(payload, secret, {
        algorithm,
        audience,
        expiresIn: Number(expiresIn), // Assurez-vous que c'est un nombre
        issuer,
    });
}
console.log("Contenu du token :", decoded);