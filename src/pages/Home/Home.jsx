import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';

// Featured books list for Home page
const FEATURED_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic Literature',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80',
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80',
  },
];

/**
 * Home Page
 * Displays hero section and featured books collection
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
            onClick={() => navigate('/books/1')}
          >
            Explore Featured Book →
          </Button>
        </Container>
      </section>

      {/* Featured Books Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">📖 Featured Books</h2>
            <p className="text-muted">Discover our curated book collection and view full details</p>
          </div>

          <Row className="g-4 justify-content-center">
            {FEATURED_BOOKS.map((book) => (
              <Col key={book.id} md={4} sm={6}>
                <Card className="h-100 shadow-sm border-0 hover-lift text-center overflow-hidden">
                  <div style={{ height: '220px', overflow: 'hidden' }}>
                    <Card.Img
                      variant="top"
                      src={book.coverUrl}
                      alt={book.title}
                      style={{ height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between p-4">
                    <div>
                      <Badge bg="primary" className="mb-2 px-3 py-2">
                        {book.category}
                      </Badge>
                      <Card.Title className="fw-bold fs-5 mt-1">{book.title}</Card.Title>
                      <Card.Text className="text-muted small">by {book.author}</Card.Text>
                    </div>
                    <Button
                      variant="outline-primary"
                      className="mt-3 rounded-pill fw-semibold"
                      onClick={() => navigate(`/books/${book.id}`)}
                    >
                      View Detail 🔍
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export default Home;

