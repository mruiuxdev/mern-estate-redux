import { Avatar, Dropdown, Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);

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
      <Navbar.Collapse>
        <Navbar.Link
          as="div"
          active={pathname === "/"}
          className="self-center h-full flex items-center"
        >
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          as="div"
          active={pathname === "/about"}
          className="self-center h-full flex items-center"
        >
          <Link to="/about">About</Link>
        </Navbar.Link>
        {currentUser ? (
          <Navbar.Link as="div">
            <Dropdown
              color="transparent"
              arrowIcon={false}
              size="sm"
              label={
                <Avatar
                  img={currentUser.avatar}
                  alt={currentUser.username}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item as="div">
                <Link to="/profile" className="w-full">
                  Profile
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
        ) : (
          <Navbar.Link
            as="div"
            active={pathname === "/sign-in"}
            className="self-center h-full flex items-center"
          >
            <Link to="/sign-in">Sign In</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
