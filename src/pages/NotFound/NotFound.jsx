import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';

/**
 * NotFound Page (404)
 * Displayed when no route matches.
 * Features:
 * - Large "404" text with gradient
 * - "Page Not Found" message
 * - "Back Home" button
 */
function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="not-found-section">
        <div className="not-found-code">404</div>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist.</p>
        <Button className="not-found-btn" onClick={() => navigate('/')}>
          ← Back Home
        </Button>
      </section>
    </Layout>
  );
}

export default NotFound;
