import React from 'react';
import UserService from '../service/EmployeeService';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    


    const handleLogout = (event) => {
        const confirmDelete = window.confirm('Are you sure you want to logout ?');
        if (confirmDelete) {
            UserService.logout();
        } else {
          event.preventDefault();
      }
    };


    return (
        <Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand >Employee Management App</Navbar.Brand>
    <Nav className="me-auto">
      {!isAuthenticated && <Nav.Link href="/">Login</Nav.Link>}
      {isAuthenticated && <Nav.Link href="/profile">Profile</Nav.Link>}
      {isAdmin && <Nav.Link href="/admin/user-management">Employee Management</Nav.Link>}
      {isAuthenticated && <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>}
    </Nav>
    
  </Container>
</Navbar>

    );
}

export default Header;


