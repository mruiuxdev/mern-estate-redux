import { Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();

  return (
    <Navbar fluid className="shadow-lg bg-gray-200 stick top-0 left-0 w-full">
      <Navbar.Brand as="div">
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
          <Link to="/">
            <span className="text-slate-700">Real</span>Estate
          </Link>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <form className="flex">
        <TextInput id="" type="text" placeholder="Search..." icon={CiSearch} />
      </form>
      <Navbar.Collapse className="items-center">
        <Navbar.Link as="div" active={pathname === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={pathname === "/about"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={pathname === "/sign-in"}>
          <Link to="/sign-in">Sign In</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
