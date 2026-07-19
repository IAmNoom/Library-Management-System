export const BOOK_CATEGORIES = [
    "Programming",
    "Science",
    "Business",
    "History",
    "Fiction",
    "Education",
    "Technology",
    "Self-help",
    "Other",
];

const currentYear = new Date().getFullYear();

export const validateBook = (book) => {
    const errors = {};

    const title = (book.title || "").trim();
    const author = (book.author || "").trim();
    const publisher = (book.publisher || "").trim();
    const isbn = (book.isbn || "").trim();
    const image = (book.image || "").trim();
    const description = (book.description || "").trim();

    if (!title) {
        errors.title = "Book title is required.";
    } else if (title.length < 2) {
        errors.title = "Book title must contain at least 2 characters.";
    } else if (title.length > 100) {
        errors.title = "Book title must not exceed 100 characters.";
    }

    if (!author) {
        errors.author = "Author is required.";
    } else if (author.length < 2) {
        errors.author = "Author name must contain at least 2 characters.";
    } else if (author.length > 80) {
        errors.author = "Author name must not exceed 80 characters.";
    }

    if (!publisher) {
        errors.publisher = "Publisher is required.";
    } else if (publisher.length > 80) {
        errors.publisher = "Publisher must not exceed 80 characters.";
    }

    if (!book.category) {
        errors.category = "Please select a category.";
    }

    if (!book.publishYear) {
        errors.publishYear = "Publication year is required.";
    } else if (
        Number(book.publishYear) < 1000 ||
        Number(book.publishYear) > currentYear
    ) {
        errors.publishYear = `Publication year must be between 1000 and ${currentYear}.`;
    }

    if (book.price === "") {
        errors.price = "Price is required.";
    } else if (Number(book.price) < 0) {
        errors.price = "Price cannot be negative.";
    } else if (Number(book.price) > 10000) {
        errors.price = "Price must not exceed 10,000.";
    }

    if (book.quantity === "") {
        errors.quantity = "Quantity is required.";
    } else if (!Number.isInteger(Number(book.quantity))) {
        errors.quantity = "Quantity must be an integer.";
    } else if (Number(book.quantity) < 0) {
        errors.quantity = "Quantity cannot be negative.";
    } else if (Number(book.quantity) > 10000) {
        errors.quantity = "Quantity must not exceed 10,000.";
    }

    if (!isbn) {
        errors.isbn = "ISBN is required.";
    } else if (!/^[0-9-]{10,17}$/.test(isbn)) {
        errors.isbn = "ISBN must contain 10 to 17 digits or hyphens.";
    }

    if (!image) {
        errors.image = "Image URL is required.";
    } else {
        try {
            const parsedUrl = new URL(image);

            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                errors.image = "Image URL must use HTTP or HTTPS.";
            }
        } catch {
            errors.image = "Please enter a valid image URL.";
        }
    }

    if (!description) {
        errors.description = "Description is required.";
    } else if (description.length < 10) {
        errors.description =
            "Description must contain at least 10 characters.";
    } else if (description.length > 1000) {
        errors.description = "Description must not exceed 1000 characters.";
    }

    return errors;
};