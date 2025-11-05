import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Button, Container } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const isAuthPage =
    window.location.pathname.includes("/login") ||
    window.location.pathname.includes("/register");
  if (!token && isAuthPage) {
    return null;
  }

  return (
    <BSNavbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BSNavbar.Brand as={Link} to="/dashboard">
          Aplikasi CRUD JWT
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {token ? (
              <>
                <BSNavbar.Text className="text-white me-3 font-weight-bold">
                  Halo, {userEmail || "User"}
                </BSNavbar.Text>
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="rounded-pill"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
