import { Container } from 'react-bootstrap';

/**
 * Footer Component
 * Displays project name, course info, and year.
 */
function Footer() {
  return (
    <footer className="footer-custom">
      <Container>
        <div className="footer-title">Library Management System</div>
        <div className="footer-sub">FER202 React Project</div>
        <div className="footer-sub">&copy; 2026</div>
      </Container>
    </footer>
  );
}

export default Footer;
