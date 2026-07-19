import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';

/**
 * Navbar Component
 * Responsive navigation bar with:
 * - Logo and brand name
 * - Navigation links (Home, Books, About)
 * - Favorite books counter from Redux store
 */
function Navbar() {
  // Read favoriteCount from Redux store
  const favoriteCount = useSelector((state) => state.favorites.favoriteCount);

  return (
    <BsNavbar expand="lg" className="navbar-custom" variant="dark" sticky="top">
      <Container>
        {/* Brand / Logo */}
        <BsNavbar.Brand as={NavLink} to="/">
          📚 Library Management
        </BsNavbar.Brand>

        {/* Responsive toggle button */}
        <BsNavbar.Toggle aria-controls="main-navbar" />

        <BsNavbar.Collapse id="main-navbar">
          {/* Left-side navigation links */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/books">
              Books
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>

          {/* Right-side favorite counter */}
          <Nav>
            <Nav.Link className="favorite-badge" disabled>
              ❤️ Favorite Books{' '}
              <span className="favorite-count">{favoriteCount}</span>
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
