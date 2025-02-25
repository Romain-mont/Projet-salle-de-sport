import HomePage from "./pages/HomePage";
import { ComponentNavBar } from "./components/Navbar/Navbar";

function App() {
	return (
		<main className="min-h-screen">
			<ComponentNavBar />
			<div className="flex-1 flex flex-col gap-8 pt-[80px]">
				{" "}
				<HomePage />
			</div>
		</main>
	);
}

export default App;
