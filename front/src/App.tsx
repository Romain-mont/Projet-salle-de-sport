import { Outlet } from "react-router-dom";
import { ComponentFooter } from "./components/Footer/Footer";
import { ComponentNavBar } from "./components/Navbar/Navbar";

function App() {
	return (
		<main className="min-h-screen">
			<ComponentNavBar />
			<div className="flex-1 flex flex-col gap-8 pt-[80px]">
				{" "}
				<Outlet />
			</div>

			<ComponentFooter />
		</main>
	);
}

export default App;
