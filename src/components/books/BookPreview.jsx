import React from "react";
import { Badge, Card } from "react-bootstrap";

const BookPreview = ({ book }) => {
    const {
        title,
        author,
        publisher,
        category,
        publishYear,
        price,
        quantity,
        isbn,
        image,
        description,
    } = book;

    const displayImage =
        image ||
        "https://placehold.co/300x420?text=Book+Cover";

    return (
        <Card className="book-preview-card shadow-sm">
            <div className="book-preview-image-wrapper">
                <Card.Img
                    variant="top"
                    src={displayImage}
                    alt={title ? `${title} cover` : "Book cover preview"}
                    className="book-preview-image"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                            "https://placehold.co/300x420?text=Invalid+Image";
                    }}
                />
            </div>

            <Card.Body>
                <div className="d-flex justify-content-between align-items-start gap-2">
                    <Card.Title className="mb-1">
                        {title || "Book title"}
                    </Card.Title>

                    <Badge bg="primary">
                        {category || "Category"}
                    </Badge>
                </div>

                <Card.Subtitle className="mb-3 text-muted">
                    By {author || "Unknown author"}
                </Card.Subtitle>

                <div className="book-preview-information">
                    <p>
                        <strong>Publisher:</strong>{" "}
                        {publisher || "Not provided"}
                    </p>

                    <p>
                        <strong>Publication year:</strong>{" "}
                        {publishYear || "Not provided"}
                    </p>

                    <p>
                        <strong>ISBN:</strong> {isbn || "Not provided"}
                    </p>

                    <p>
                        <strong>Price:</strong>{" "}
                        {price !== ""
                            ? `$${Number(price).toFixed(2)}`
                            : "$0.00"}
                    </p>

                    <p>
                        <strong>Quantity:</strong>{" "}
                        {quantity !== "" ? quantity : 0}
                    </p>
                </div>

                <Card.Text className="book-preview-description">
                    {description ||
                        "The book description will appear here."}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default BookPreview;