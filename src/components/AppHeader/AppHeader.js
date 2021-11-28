import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

class AppHeader extends React.Component {
  render() {
    return(
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>Sleep Schedule</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default AppHeader;
