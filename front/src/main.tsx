import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { LoginComponent } from "./pages/Login/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import { ProfileComponent } from "./pages/Profil/Profil.tsx";
import { InscriptionComponent } from "./pages/Inscription/Inscription.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const routeElement = document.getElementById("root")!;

const root = createRoot(routeElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/abonnement" />
					<Route path="/profile" element={<ProfileComponent />} />
					<Route path="/login" element={<LoginComponent />} />
					<Route path="/subscription" element={<InscriptionComponent />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
