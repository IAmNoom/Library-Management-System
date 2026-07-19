import React from "react";
import {
    Alert,
    Button,
    Col,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";

import { BOOK_CATEGORIES } from "../../utils/bookValidation";

const BookForm = ({
    book,
    errors,
    apiError,
    isSubmitting,
    onChange,
    onSubmit,
    onCancel,
}) => {
    const currentYear = new Date().getFullYear();

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

    return (
        <Form noValidate onSubmit={onSubmit}>
            {apiError && (
                <Alert variant="danger" role="alert">
                    {apiError}
                </Alert>
            )}

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>
                            Book title <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            placeholder="Enter book title"
                            isInvalid={Boolean(errors.title)}
                            disabled={isSubmitting}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3" controlId="author">
                        <Form.Label>
                            Author <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="author"
                            value={author}
                            onChange={onChange}
                            placeholder="Enter author name"
                            isInvalid={Boolean(errors.author)}
                            disabled={isSubmitting}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.author}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="publisher">
                        <Form.Label>
                            Publisher <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="publisher"
                            value={publisher}
                            onChange={onChange}
                            placeholder="Enter publisher"
                            isInvalid={Boolean(errors.publisher)}
                            disabled={isSubmitting}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.publisher}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>
                            Category <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Select
                            name="category"
                            value={category}
                            onChange={onChange}
                            isInvalid={Boolean(errors.category)}
                            disabled={isSubmitting}
                        >
                            <option value="">Select category</option>

                            {BOOK_CATEGORIES.map((categoryName) => (
                                <option
                                    key={categoryName}
                                    value={categoryName}
                                >
                                    {categoryName}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="publishYear">
                        <Form.Label>
                            Publication year{" "}
                            <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="publishYear"
                            value={publishYear}
                            onChange={onChange}
                            min="1000"
                            max={currentYear}
                            placeholder="Example: 2020"
                            isInvalid={Boolean(errors.publishYear)}
                            disabled={isSubmitting}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.publishYear}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>
                            Price ($) <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="price"
                            value={price}
                            onChange={onChange}
                            min="0"
                            step="0.01"
                            placeholder="Example: 19.99"
                            isInvalid={Boolean(errors.price)}
                            disabled={isSubmitting}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label>
                            Quantity <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={onChange}
                            min="0"
                            step="1"
                            placeholder="Example: 10"
                            isInvalid={Boolean(errors.quantity)}
                            disabled={isSubmitting}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.quantity}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="isbn">
                <Form.Label>
                    ISBN <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                    type="text"
                    name="isbn"
                    value={isbn}
                    onChange={onChange}
                    placeholder="Example: 9780132350884"
                    isInvalid={Boolean(errors.isbn)}
                    disabled={isSubmitting}
                />

                <Form.Control.Feedback type="invalid">
                    {errors.isbn}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>
                    Cover image URL <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                    type="url"
                    name="image"
                    value={image}
                    onChange={onChange}
                    placeholder="https://example.com/book-cover.jpg"
                    isInvalid={Boolean(errors.image)}
                    disabled={isSubmitting}
                />

                <Form.Control.Feedback type="invalid">
                    {errors.image}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="description">
                <Form.Label>
                    Description <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Enter a short description of the book"
                    isInvalid={Boolean(errors.description)}
                    disabled={isSubmitting}
                />

                <div className="d-flex justify-content-between">
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>

                    <Form.Text className="text-muted ms-auto">
                        {description.length}/1000
                    </Form.Text>
                </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                                aria-hidden="true"
                            />
                            Adding book...
                        </>
                    ) : (
                        "Add Book"
                    )}
                </Button>
            </div>
        </Form>
    );
};

export default BookForm;