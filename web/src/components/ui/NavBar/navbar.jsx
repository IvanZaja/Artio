import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import ArtioLogo from "./ArtioLogo";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../contexts/auth.context";
import { NavLink } from "react-router-dom";

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function NavBar() {
  const { userLoged, doLogout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const scrollListener = () => {
      setIsTop(window.pageYOffset < 50);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} height='6rem' maxWidth='full' style={{ backgroundColor: isTop ? 'transparent' : '#ffffffa1' }}>
          <NavbarContent className="flex justify-between w-full" >
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
    
          
          
            <NavbarContent as="div" justify="end" className="hidden md:flex">
            {!userLoged && (
              <div className="hidden md:flex gap-4">
              <NavbarItem>
                <Link className="nav-item" color="foreground"><NavLink className={renderNavLinkActive} to="/register">Register</NavLink></Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="nav-item" color="foreground"><NavLink className={renderNavLinkActive} to="/Login">Login</NavLink></Link>
              </NavbarItem>
              </div>
            )}
            {userLoged && (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={userLoged?.name}
                  size="md"
                  src={userLoged?.avatar}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userLoged?.email}</p>
                </DropdownItem>
                <DropdownItem href={`/MyProfile`}>Profile</DropdownItem>
                {userLoged?.role === 'host' && (
                  <DropdownItem href="/requests">Requests</DropdownItem>
                )}
                {userLoged?.role === 'company' && (
                  <DropdownItem href="/received-requests">Requests</DropdownItem>
                )}
                <DropdownItem color="danger" onClick={doLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          </NavbarContent>
          
          
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
                {userLoged && (
                <div className="flex flex-col mb-5">
                  <Link color="foreground" className="text-3xl mt-5" href="/MyProfile">
                    Profile
                  </Link>
                  <Link color="foreground" className="text-3xl mt-5" href="/requests">
                    Requests
                  </Link>
                  <Link color="danger" className="text-3xl mt-5" onClick={doLogout}>
                    Log out
                  </Link>
                </div>
                )}
              </div>
              
              <div className="h-full divide-y">
              {!userLoged && (
                <div className="flex flex-col gap-4 mt-5">
                  <li className="nav-item text-3xl mt-5"><NavLink className={renderNavLinkActive} to="/register">Register</NavLink></li>
                  <li className="nav-item text-3xl mt-5"><NavLink className={renderNavLinkActive} to="/login">Login</NavLink></li>
                </div>
              )}
              {userLoged && (
                <div className="flex gap-4 items-center mt-5">
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={userLoged?.name}
                    size="md"
                    src={userLoged?.avatar}
                  />
                  <div>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userLoged?.email}</p>
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