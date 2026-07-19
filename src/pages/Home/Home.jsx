import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';

/**
 * Home Page
 * Displays a hero section with:
 * - Welcome title
 * - Description
 * - "Explore Books" button that navigates to /books
 */
function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1>📚 Welcome to Library Management</h1>
          <p>
            Discover, organize, and manage your book collection effortlessly.
            Your personal digital library awaits.
          </p>
          <Button
            className="hero-btn"
            size="lg"
            onClick={() => navigate('/books')}
          >
            Explore Books →
          </Button>
        </Container>
      </section>
    </Layout>
  );
}

export default Home;
