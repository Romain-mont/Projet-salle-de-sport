import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { LoginComponent } from "./components/Login/Login.tsx";
import HomePage from "./pages/HomePage.tsx";

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/connect" element={<LoginComponent />} />
					<Route path="/abonnement" />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
