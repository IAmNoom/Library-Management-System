import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert, Breadcrumb } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import BookInfo from '../../components/BookInfo/BookInfo';
import api from '../../services/api';

// Fallback dataset when json-server is not running or record is available in local dataset
const DATASET_BOOKS = {
  '1': {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic Literature',
    publishedYear: 1925,
    publisher: 'Charles Scribner\'s Sons',
    isbn: '978-0743273565',
    description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan. Set during the Roaring Twenties on Long Island, the novel explores themes of decadence, idealism, resistance to change, social upheaval, and excess.',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    rating: 4.8,
    status: 'Available',
    pages: 180,
    language: 'English',
  },
  '2': {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    publishedYear: 1960,
    publisher: 'J. B. Lippincott & Co.',
    isbn: '978-0061120084',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Compassionate, dramatic, and deeply moving, To Kill A Mockingbird takes the reader to the roots of human behavior.',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80',
    rating: 4.9,
    status: 'Available',
    pages: 281,
    language: 'English',
  },
  '3': {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    publishedYear: 1949,
    publisher: 'Secker & Warburg',
    isbn: '978-0451524935',
    description: 'A startlingly original and haunting novel that creates an imaginary world that is completely convincing, from the first sentence to the four final words. Winston Smith works for the Ministry of Truth in Oceania.',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80',
    rating: 4.7,
    status: 'Borrowed',
    pages: 328,
    language: 'English',
  },
};

/**
 * BookDetail Page Component
 * Handles fetching book by ID from GET /books/:id
 */
function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Call API GET /books/:id
    api
      .get(`/books/${id}`)
      .then((response) => {
        if (isMounted) {
          setBook(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          // Fallback to dataset if server is offline or record exists in local database
          if (DATASET_BOOKS[id]) {
            setBook(DATASET_BOOKS[id]);
            setError(null);
          } else {
            setError(`Book with ID "${id}" could not be found.`);
          }
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Handle Back Button click
  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/books');
    }
  };

  return (
    <Layout>
      <div className="book-detail-page py-4">
        <Container>
          {/* Top Header Controls: Back Button & Breadcrumbs */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <Button
              variant="outline-secondary"
              onClick={handleGoBack}
              className="back-btn d-inline-flex align-items-center gap-2 rounded-pill px-4 shadow-sm"
            >
              <span>←</span>
              <span>Back</span>
            </Button>

            <Breadcrumb className="mb-0 custom-breadcrumb">
              <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => navigate('/books')}>Books</Breadcrumb.Item>
              <Breadcrumb.Item active>{book ? book.title : `Book #${id}`}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-5 my-5">
              <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3 text-muted fw-semibold">Loading book details...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <Alert variant="danger" className="shadow-sm my-4">
              <Alert.Heading>Book Not Found</Alert.Heading>
              <p>{error}</p>
              <Button variant="outline-danger" onClick={handleGoBack}>
                Return to Books
              </Button>
            </Alert>
          )}

          {/* Book Information View */}
          {!loading && book && (
            <div className="book-detail-container">
              <BookInfo book={book} />
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
}

export default BookDetail;
