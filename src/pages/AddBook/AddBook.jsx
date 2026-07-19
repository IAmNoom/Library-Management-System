import React, { useState } from "react";
import {
    Alert,
    Card,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookForm from "../../components/books/BookForm";
import BookPreview from "../../components/books/BookPreview";
import { createBook } from "../../services/bookService";
import { validateBook } from "../../utils/bookValidation";
import "../../components/books/BookForm.css";

const initialBookState = {
    title: "",
    author: "",
    publisher: "",
    category: "",
    publishYear: "",
    price: "",
    quantity: "",
    isbn: "",
    image: "",
    description: "",
};

const AddBook = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState(initialBookState);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setBook((previousBook) => ({
            ...previousBook,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((previousErrors) => ({
                ...previousErrors,
                [name]: "",
            }));
        }

        if (apiError) {
            setApiError("");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setApiError("");
        setSuccessMessage("");

        const validationErrors = validateBook(book);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const newBook = {
            title: book.title.trim(),
            author: book.author.trim(),
            publisher: book.publisher.trim(),
            category: book.category,
            publishYear: Number(book.publishYear),
            price: Number(book.price),
            quantity: Number(book.quantity),
            isbn: book.isbn.trim(),
            image: book.image.trim(),
            description: book.description.trim(),
            createdAt: new Date().toISOString(),
        };

        try {
            const createdBook = await createBook(newBook);

            setSuccessMessage(
                `"${createdBook.title}" was added successfully.`
            );

            setBook(initialBookState);

            window.setTimeout(() => {
                navigate("/", {
                    state: {
                        message: `"${createdBook.title}" was added successfully.`,
                    },
                });
            }, 1000);
        } catch (error) {
            setApiError(
                error.message ||
                "An unexpected error occurred while adding the book."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        const hasEnteredData = Object.values(book).some(
            (value) => String(value).trim() !== ""
        );

        if (hasEnteredData) {
            const shouldLeave = window.confirm(
                "Your entered information has not been saved. Do you want to leave this page?"
            );

            if (!shouldLeave) {
                return;
            }
        }

        navigate("/");
    };

    return (
        <main className="add-book-page py-5">
            <Container>
                <div className="add-book-heading mb-4">
                    <p className="text-primary fw-semibold mb-1">
                        Library Management System
                    </p>

                    <h1 className="mb-2">Add a New Book</h1>

                    <p className="text-muted mb-0">
                        Enter the book information and review the preview
                        before saving.
                    </p>
                </div>

                {successMessage && (
                    <Alert variant="success" role="status">
                        {successMessage}
                    </Alert>
                )}

                <Row className="g-4">
                    <Col lg={8}>
                        <Card className="book-form-card shadow-sm">
                            <Card.Body className="p-4">
                                <Card.Title className="mb-4">
                                    Book Information
                                </Card.Title>

                                <BookForm
                                    book={book}
                                    errors={errors}
                                    apiError={apiError}
                                    isSubmitting={isSubmitting}
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    onCancel={handleCancel}
                                />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <div className="book-preview-sticky">
                            <h2 className="h5 mb-3">Live Preview</h2>

                            <BookPreview book={book} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default AddBook;