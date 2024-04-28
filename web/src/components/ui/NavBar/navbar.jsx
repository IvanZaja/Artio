import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import ArtioLogo from "./ArtioLogo";
import { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} height='6rem' maxWidth='full'>
          <NavbarContent className="flex justify-between w-full">
              <NavbarBrand>
                <ArtioLogo/>
                <p className="font-bold text-inherit text-3xl">Artio</p>
              </NavbarBrand>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden"
              />
          </NavbarContent>

    
          <NavbarContent className="hidden md:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#" color="foreground">
                Packages
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Our mission
              </Link>
            </NavbarItem>
          </NavbarContent>
    
          <NavbarContent as="div" justify="end" className="hidden md:flex">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="md"
                  src="https://res.cloudinary.com/djfnazn3y/image/upload/v1713646708/portfolio/yofqhyokrbdakdhm8pj5.jpg"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem href="#">Profile</DropdownItem>
                <DropdownItem href="#">Analytics</DropdownItem>
                <DropdownItem color="danger"href="#">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarMenu>
            <NavbarMenuItem className="divide-y">
              <div className="content-start divide-y">
                <div className="flex flex-col mb-5">
                  <Link color="foreground" className="text-3xl mt-5" href="/">
                    Home
                  </Link>
                  <Link color="foreground" className="text-3xl mt-5" href="#">
                    Packages
                  </Link>
                  <Link color="foreground" className="text-3xl mt-5" href="#">
                    Our mission
                  </Link>
                </div>
                <div className="flex flex-col mb-5">
                  <Link color="foreground" className="text-3xl mt-5" href="#">
                    Profile
                  </Link>
                  <Link color="foreground" className="text-3xl mt-5" href="#">
                    Analytics
                  </Link>
                  <Link color="danger" className="text-3xl mt-5" href="#">
                    Log out
                  </Link>
                </div>
              </div>
              <div className="h-full divide-y">
                <div className="flex gap-4 items-center mt-5">
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="md"
                    src="https://res.cloudinary.com/djfnazn3y/image/upload/v1713646708/portfolio/yofqhyokrbdakdhm8pj5.jpg"
                  />
                  <div>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </div>
                </div>
              </div>
              
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      );
}

export default NavBar