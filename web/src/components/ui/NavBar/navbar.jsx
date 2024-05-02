import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import ArtioLogo from "./ArtioLogo";
import { useState, useContext } from "react";
import AuthContext from "../../../contexts/auth.context";
import { NavLink } from "react-router-dom";

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function NavBar() {
  const { user, doLogout } = useContext(AuthContext);
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
              <Link color="foreground" href="#">
                Our mission
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/projects" color="foreground">
                Projects
              </Link>
            </NavbarItem>
          </NavbarContent>
    
          {!user && (
              <>
                <li className="nav-item"><NavLink className={renderNavLinkActive} to="/register">Register</NavLink></li>
                <li className="nav-item"><NavLink className={renderNavLinkActive} to="/Login">Login</NavLink></li>
              </>
            )}
          {user && (
            <NavbarContent as="div" justify="end" className="hidden md:flex">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user?.name}
                  size="md"
                  src={user?.avatar}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem href="#">Profile</DropdownItem>
                <DropdownItem href="#">Requests</DropdownItem>
                <DropdownItem color="danger" onClick={doLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          )}
          
          <NavbarMenu>
            <NavbarMenuItem className="divide-y">
              <div className="content-start divide-y">
                <div className="flex flex-col mb-5">
                  <Link color="foreground" className="text-3xl mt-5" href="/">
                    Home
                  </Link>
                  <Link color="foreground" className="text-3xl mt-5" href="#">
                    Our mission
                  </Link>
                  <Link color="foreground" className="text-3xl mt-5" href="/projects">
                    Projects
                  </Link>
                </div>
                <div className="flex flex-col mb-5">
                  <Link color="foreground" className="text-3xl mt-5" href="#">
                    Profile
                  </Link>
                  <Link color="foreground" className="text-3xl mt-5" href="#">
                    Requests
                  </Link>
                  <Link color="danger" className="text-3xl mt-5" onClick={doLogout}>
                    Log out
                  </Link>
                </div>
              </div>
              
              <div className="h-full divide-y">
              {!user && (
                <>
                  <li className="nav-item"><NavLink className={renderNavLinkActive} to="/register">Register</NavLink></li>
                  <li className="nav-item"><NavLink className={renderNavLinkActive} to="/Login">Login</NavLink></li>
                </>
              )}
              {user && (
                <div className="flex gap-4 items-center mt-5">
                
                
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={user?.name}
                    size="md"
                    src={user?.avatar}
                  />
                  <div>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                </div>
              
              )}
              </div>
              
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      );
}

export default NavBar