import React from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { Input } from "semantic-ui-react";
import logo from "../../Image/Logo.png";
import logo2 from "../../Image/Logo2.png";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LocationContext } from "../../App";

const navItems = [
  { name: "Home", path: "home" },
  { name: "Destination", path: "destination" },
  { name: "Blog", path: "blog" },
  { name: "Contact", path: "contact" },
];

const Header = () => {
  const location = useLocation();
  const isNavWhite =
    location.pathname.includes("login") ||
    location.pathname.includes("contact");

  const [{ loggedInUser, setLoggedInUser }] = useContext(LocationContext);

  console.log(loggedInUser);

  return (
    <Navbar
      expand="lg"
      className={`${isNavWhite ? "bg-white" : "bg-none"} px-5`}
    >
      <Link to="/" className="py-4 px-5 navBar d-flex align-items-center">
        <img src={isNavWhite ? logo2 : logo} alt="logo" />
        <div className={`${isNavWhite ? "d-none" : "d-none d-xl-block"} px-5`}>
          <Input
            size="big"
            iconPosition="left"
            icon="search"
            placeholder="Search your Destination..."
          />
        </div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto align-items-center">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`${isNavWhite ? "text-dark" : "text-white"} linkText`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/login">
            {" "}
            <button
              onClick={() => loggedInUser?.email && setLoggedInUser({})}
              className="btn btn-warning text-dark "
            >
              {loggedInUser?.email ? "Logout" : "Login"}
            </button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
