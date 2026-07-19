import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import { resetFavorite, toggleFavorite } from '../../redux/favoriteSlice';
import api from '../../services/api';

// Fallback dataset for favorited books if API server is offline
const DATASET_BOOKS = {
  '1': {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic Literature',
    publishedYear: 1925,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    rating: 4.8,
  },
  '2': {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    publishedYear: 1960,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80',
    rating: 4.9,
  },
  '3': {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    publishedYear: 1949,
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80',
    rating: 4.7,
  },
};

/**
 * Favorites Page Component
 * Displays the list of all books favorited by the user
 */
function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds || []);

  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (favoriteIds.length === 0) {
      setFavoriteBooks([]);
      return;
    }

    setLoading(true);

    // Fetch details for all favorited IDs
    const fetchPromises = favoriteIds.map((id) =>
      api
        .get(`/books/${id}`)
        .then((res) => res.data)
        .catch(() => DATASET_BOOKS[id] || {
          id: id,
          title: `Book #${id}`,
          author: 'Library Author',
          category: 'General',
          coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80',
          rating: 4.5,
        })
    );

    Promise.all(fetchPromises).then((results) => {
      if (isMounted) {
        setFavoriteBooks(results);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [favoriteIds]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all books from your favorites?')) {
      dispatch(resetFavorite());
    }
  };

  const handleRemoveOne = (bookId) => {
    dispatch(toggleFavorite(bookId));
  };


  return (
    <Layout>
      <div className="favorites-page py-5">
        <Container>
          {/* Header */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 border-bottom pb-3">
            <div>
              <h1 className="fw-bold text-dark mb-1">❤️ My Favorite Books</h1>
              <p className="text-muted mb-0">
                You have {favoriteIds.length} {favoriteIds.length === 1 ? 'book' : 'books'} in your collection
              </p>
            </div>

            {favoriteIds.length > 0 && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleClearAll}
                className="rounded-pill px-3 fw-semibold"
              >
                🗑️ Clear All Favorites
              </Button>
            )}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-5 my-5">
              <Spinner animation="border" variant="danger" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3 text-muted fw-semibold">Loading your favorites...</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && favoriteIds.length === 0 && (
            <div className="empty-favorites-container text-center py-5 my-4 bg-white rounded-4 shadow-sm p-4">
              <div className="empty-favorites-icon mb-3" style={{ fontSize: '4.5rem' }}>
                💔
              </div>
              <h3 className="fw-bold text-dark mb-2">No Favorites Yet</h3>
              <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '450px' }}>
                You haven't added any books to your favorite list. Explore our collection and click the heart icon to save books here!
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/')}
                className="rounded-pill px-4 shadow-sm fw-semibold"
              >
                📚 Discover Books
              </Button>
            </div>
          )}

          {/* Favorites List Grid */}
          {!loading && favoriteIds.length > 0 && (
            <Row className="g-4">
              {favoriteBooks.map((book) => {
                const cover = book.coverUrl || book.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80';
                return (
                  <Col key={book.id} lg={4} md={6}>
                    <Card className="h-100 border-0 shadow-sm rounded-3 overflow-hidden favorite-card position-relative">
                      <div className="position-relative" style={{ height: '230px', overflow: 'hidden' }}>
                        <Card.Img
                          variant="top"
                          src={cover}
                          alt={book.title}
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                        <div className="position-absolute top-0 end-0 p-2">
                          <FavoriteButton bookId={book.id} size="sm" showLabel={false} />
                        </div>
                      </div>

                      <Card.Body className="d-flex flex-column justify-content-between p-4">
                        <div>
                          <Badge bg="primary" className="mb-2 px-3 py-2">
                            {book.category || 'General'}
                          </Badge>
                          <Card.Title className="fw-bold text-dark fs-5 mb-1">{book.title}</Card.Title>
                          <Card.Text className="text-muted small mb-3">
                            by {book.author || 'Unknown'}
                          </Card.Text>
                        </div>

                        <div>
                          <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-2 mb-3">
                            <span className="text-warning fw-bold small">★ {book.rating || 4.5} / 5</span>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="rounded-pill px-3 fw-semibold"
                              onClick={() => navigate(`/books/${book.id}`)}
                            >
                              View Detail 🔍
                            </Button>
                          </div>

                          {/* Single book removal button */}
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="w-100 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-1"
                            onClick={() => handleRemoveOne(book.id, book.title)}
                            title="Remove this book from favorites"
                          >
                            <span>❌</span>
                            <span>Remove from Favorites</span>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}

        </Container>
      </div>
    </Layout>
  );
}

export default Favorites;
