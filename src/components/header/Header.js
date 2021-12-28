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
import { getSearch } from "../../services/articlesService";

function Header() {
  const [user, setUser] = useState("");
  const [search, setSearch] = useState({ data: "" });
  const [searchResult, setSearchResult] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  function getNewValueHandler(time) {
    setSearchResult([]);
    setTimeout(() => {
      setUser(cookiesService.GetUserName());
      setIsAuthenticated(isAuth);
      setIsAdminUser(isAdmin);
    }, time);
  }

  const onChangeSearchHandler = (e) => {
    const value = e.target.value;
    setSearch({
      ...search,
      ["data"]: value,
    });
  };

  const onClickSearchHandler = (e) => {
   e.preventDefault();
   
    getSearch(search?.data)
      .then((res) => {
        //console.log(res?.result.items);
        setSearchResult(res?.result.items);
      })
      .catch((err) => {
        //TODO notification
      });
  };

  useEffect(() => {
    getNewValueHandler(100);
  }, []);

  return (
    <>
      <Navbar
        onClick={() => getNewValueHandler(1)}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Form className="d-flex" onSubmit={onClickSearchHandler}>
            <FormControl
              type="search"
              placeholder="Search...title,description"
              className="me-2"
              size="sm"
              aria-label="Search"
              onChange={onChangeSearchHandler}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
          <Navbar.Brand/>
          <Navbar.Brand to="/" as={Link}>
            My Blog. Hello {user}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAdminUser && (
                <NavDropdown
                  title="Administrations"
                  id="collasible-nav-dropdown"
                >
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
              {/* <Nav.Link eventKey={3} to="/features" as={Link}>
                Features
              </Nav.Link> */}
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
      {searchResult.map((x) => {
        return (<Nav.Link as={Link} to={`/post/${x.id}/details`}>{x.title}</Nav.Link>);
      })}
    </>
  );
}

export default Header;
