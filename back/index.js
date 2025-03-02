import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./src/middlewares/notFound.js";
import { router } from "./src/router/router.js";

const app = express();
app.use(
	// on passe un objet de config à cors
	cors({
		// la clé origin a pour valeur un tableau qui représents la liste des URL autorisé à requêter notre serveur
		origin: [
			"http://localhost:5500",
			"http://127.0.0.1:5500",
			"http://localhost:5173",
			"http://127.0.0.1:5173",
		],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(notFound);

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`listenning on ${process.env.BASE_URL}:${port}`);
});
