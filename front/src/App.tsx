import { ComponentCarousel } from "./components/Carousel/Carousel";
import { NavbarSport } from "./components/Navbar/Navbar";


function App() {
  return (
    <main className="min-h-screen">
    <div className="flex flex-col gap-8">
      <NavbarSport />
      <div className="container mx-auto px-4">
      <div className="max-w-screen-xl mx-auto">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <ComponentCarousel />
          </div>
        </div>
      </div>
    </div>
  </main>
)
}

export default App;