import HomePage from "./assets/pages/HomePage";
import { ComponentNavBar } from "./components/Navbar/Navbar";

function App() {
	return (
		<main className="min-h-screen flex flex-col">
			<div className="flex-1 flex flex-col gap-8">
				<ComponentNavBar />
				<HomePage />
			</div>
		</main>
	);
}

export default App;
