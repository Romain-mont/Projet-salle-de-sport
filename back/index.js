import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./src/middlewares/notFound.js";
import { router } from "./src/router/router.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(notFound);

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`listenning on ${process.env.BASE_URL}:${port}`);
});
