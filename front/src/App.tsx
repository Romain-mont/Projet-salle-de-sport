import { ComponentCarousel } from "./components/Carousel/Carousel";
import { ComponentFooter } from "./components/Footer/Footer";
import { ComponentNavBar} from "./components/Navbar/Navbar";


function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-8">
        <ComponentNavBar />
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <ComponentCarousel />
            </div>
          </div>
        </div>
        <ComponentFooter />
      </div>
    </main>
  );
}


export default App;