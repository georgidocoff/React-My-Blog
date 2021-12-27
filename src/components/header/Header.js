import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import * as cookiesService from "../../services/cookiesService";
import { isAdmin, isAuth } from "../../services/authService";

function Header() {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  function getNewValueHandler(time) {
    setTimeout(() => {
      setUser(cookiesService.GetUserName());
      setIsAuthenticated(isAuth);
      setIsAdminUser(isAdmin);
    }, time);
  }

  useEffect(() => {
    getNewValueHandler(100);
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          My Blog. Hello {user}
        </Navbar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            size="sm"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isAdminUser && (
              <NavDropdown title="Administrations" id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey={11} to="/admin/users" as={Link}>
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={12} to="/admin/roles" as={Link}>
                  Roles
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey={2} to="/post/all" as={Link}>
                  All posts
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link eventKey={3} to="/features" as={Link}>
              Features
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={41} to="/post/all" as={Link}>
              All Posts
            </Nav.Link>
            {(isAuthenticated && (
              <>
                <Nav.Link eventKey={42} to="/post/add" as={Link}>
                  Add Post
                </Nav.Link>
                <Nav.Link eventKey={51} to="/profile" as={Link}>
                  Profile
                </Nav.Link>
                <Nav.Link
                  eventKey={54}
                  to="/logout"
                  as={Link}
                  onClickCapture={() => getNewValueHandler(1000)}
                >
                  Logout
                </Nav.Link>
              </>
            )) || (
              <>
                <Nav.Link
                  eventKey={52}
                  to="/register"
                  as={Link}
                  onClick={() => getNewValueHandler(500)}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  eventKey={53}
                  to="/login"
                  as={Link}
                  onClickCapture={() => getNewValueHandler(7000)}
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
