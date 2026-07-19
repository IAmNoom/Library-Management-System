import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

/**
 * Layout Component
 * Wraps every page with a consistent layout:
 * - Top: Navbar
 * - Middle: Page content (children)
 * - Bottom: Footer
 */
function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 page-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
