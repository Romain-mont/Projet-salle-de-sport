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
    <Flowbite theme={{ theme: customTheme }}>
    <Navbar fluid rounded>
       <NavbarToggle />
      <NavbarBrand >
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap font-['Bebas_Neue'] text-3xl font-semibold dark:text-white">DevFit Studio</span>
      </NavbarBrand>
      <div className="flex md:order-2">
      <Button color="primary">
            <span className="text-xl">S'inscrire</span>
      </Button>

       
      </div>
      <NavbarCollapse>
          <NavbarLink href="#" active>Accueil</NavbarLink>
          <NavbarLink href="#">Nos salles</NavbarLink>
          <NavbarLink href="#">Abonnement</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
          <NavbarLink href="#">Newsletter</NavbarLink>
          <NavbarLink href="#">Se connecter</NavbarLink>
        </NavbarCollapse>
    </Navbar>
    </Flowbite>
  );
}