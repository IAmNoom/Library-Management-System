import React from 'react';
import { Row, Col, Badge, Card } from 'react-bootstrap';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

/**
 * BookInfo Component
 * Displays comprehensive details of a book.
 *
 * @param {Object} props
 * @param {Object} props.book - Book data object containing full information
 */
function BookInfo({ book }) {
  if (!book) return null;

  const {
    id,
    title,
    author,
    category,
    publishedYear,
    publishYear,
    publisher,
    isbn,
    description,
    coverUrl,
    image,
    rating = 4.5,
    status = 'Available',
    pages = 320,
    language = 'English',
  } = book;

  const displayCover = coverUrl || image;
  const displayYear = publishedYear || publishYear;


  // Render star ratings
  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('½');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars.join(' ');
  };

  const isAvailable = status.toLowerCase() === 'available';

  return (
    <Card className="book-info-card border-0 shadow-lg overflow-hidden">
      <Card.Body className="p-4 p-md-5">
        <Row className="g-4 align-items-center align-items-md-start">
          {/* Left Side: Cover Image */}
          <Col lg={4} md={5} className="text-center">
            <div className="book-cover-wrapper position-relative mx-auto">
              {displayCover ? (
                <img
                  src={displayCover}
                  alt={title}
                  className="img-fluid book-cover-img rounded shadow"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80';
                  }}
                />
              ) : (
                <div className="book-cover-placeholder rounded shadow d-flex flex-column align-items-center justify-content-center">
                  <span className="placeholder-emoji">📚</span>
                  <span className="placeholder-title px-2">{title}</span>
                </div>
              )}
              <div className="mt-3 text-center">
                <Badge
                  bg={isAvailable ? 'success' : 'warning'}
                  className="status-badge px-3 py-2 fs-6 rounded-pill"
                >
                  {isAvailable ? '🟢 Available to Borrow' : '🟡 Currently Borrowed'}
                </Badge>
              </div>
            </div>
          </Col>

          {/* Right Side: Detailed Book Information */}
          <Col lg={8} md={7}>
            <div className="book-details-header mb-3">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <Badge bg="primary" className="category-badge px-3 py-2">
                  🏷️ {category || 'General'}
                </Badge>

                {displayYear && (
                  <Badge bg="secondary" className="year-badge px-3 py-2">
                    📅 {displayYear}
                  </Badge>
                )}
              </div>


              <h1 className="book-title fw-bold text-dark mb-2">{title}</h1>
              <h4 className="book-author text-muted mb-3">
                by <span className="text-primary fw-semibold">{author || 'Unknown Author'}</span>
              </h4>

              {/* Rating & Favorite Button row */}
              <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <div className="book-rating text-warning fs-5 fw-bold d-flex align-items-center gap-1">
                  <span>{renderStars(rating)}</span>
                  <span className="text-dark fs-6 ms-1">({rating} / 5)</span>
                </div>

                <div className="ms-auto ms-sm-0">
                  <FavoriteButton bookId={id} size="md" />
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Description Section */}
            <div className="book-description-section mb-4">
              <h5 className="fw-bold text-dark mb-2">📖 Book Summary</h5>
              <p className="book-description text-secondary lh-lg mb-0">
                {description || 'No detailed summary available for this title.'}
              </p>
            </div>

            {/* Detailed Meta Grid */}
            <div className="book-meta-grid p-3 p-md-4 rounded bg-light border">
              <Row className="g-3">
                <Col sm={6} md={3}>
                  <div className="meta-item">
                    <span className="meta-label text-muted d-block small fw-bold">ISBN</span>
                    <span className="meta-value text-dark fw-semibold">{isbn || 'N/A'}</span>
                  </div>
                </Col>
                <Col sm={6} md={3}>
                  <div className="meta-item">
                    <span className="meta-label text-muted d-block small fw-bold">PUBLISHER</span>
                    <span className="meta-value text-dark fw-semibold">{publisher || 'Standard Edition'}</span>
                  </div>
                </Col>
                <Col sm={6} md={3}>
                  <div className="meta-item">
                    <span className="meta-label text-muted d-block small fw-bold">PAGES</span>
                    <span className="meta-value text-dark fw-semibold">{pages} pages</span>
                  </div>
                </Col>
                <Col sm={6} md={3}>
                  <div className="meta-item">
                    <span className="meta-label text-muted d-block small fw-bold">LANGUAGE</span>
                    <span className="meta-value text-dark fw-semibold">{language}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default BookInfo;
