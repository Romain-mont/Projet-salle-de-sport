import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Flowbite} from "flowbite-react";

const customTheme = {
  navbar: {
    link: {
      active: {
        on: "text-[#0077B6] border-b-2 border-[#0077B6]"
      },
      base: "font-['Poppins'] text-xl border-b-2 border-transparent hover:border-[#0077B6]"
    }
  },
  button: {
    base: "font-['Poppins']",
    color: {
      primary: "bg-[#FED703] text-[#3C454D] hover:bg-[#0077B6] hover:text-white"
    }
  }
};

export function NavbarSport() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-screen-xl mx-auto">
        <Flowbite theme={{ theme: customTheme }}>

        <Navbar fluid rounded className="px-2 md:px-4 lg:px-6">

            <NavbarToggle className="md:hidden"/>
            <NavbarBrand href="/" className="flex items-center">

            <span className="text-2xl md:text-3xl lg:text-4xl font-['Bebas_Neue']">
                DevFit Studio
              </span>

            </NavbarBrand>

            <div className="flex md:order-2 gap-2 md:gap-4">
              <Button className="text-sm md:text-base lg:text-lg" color="primary">
                <span className="text-xl">S'inscrire</span>
              </Button>
            </div>

            <NavbarCollapse className="md:flex md:space-x-4 lg:space-x-6">
              <NavbarLink className="text-sm md:text-base lg:text-lg" href="#" active>Accueil</NavbarLink>
              <NavbarLink className="text-sm md:text-base lg:text-lg" href="#">Nos salles</NavbarLink>
              <NavbarLink className="text-sm md:text-base lg:text-lg" href="#">Abonnement</NavbarLink>
              <NavbarLink className="text-sm md:text-base lg:text-lg" href="#">Contact</NavbarLink>
              <NavbarLink className="text-sm md:text-base lg:text-lg" href="#">Newsletter</NavbarLink>
              <NavbarLink className="text-sm md:text-base lg:text-lg" href="#">Se connecter</NavbarLink>
            </NavbarCollapse>
          </Navbar>
        </Flowbite>
      </div>
    </div>
  );
}