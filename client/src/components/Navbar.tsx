import React from "react"
import { Navbar, Nav, Button, Container } from "react-bootstrap"
import { useAuth } from "../Contexts/AuthContext"

const CustomNavbar = ({ logout }) => {
  const { token } = useAuth()

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand style={{ fontWeight: "bold" }}>Trello</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {token ? (
            <Nav className="mr-auto">
              <Button variant="primary" onClick={logout}>
                Logout
              </Button>
            </Nav>
          ) : (
            <Nav className="mr-auto">
              <Nav.Link href="login">Login</Nav.Link>
              <Button variant="primary" href="/">
                Sign Up
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
