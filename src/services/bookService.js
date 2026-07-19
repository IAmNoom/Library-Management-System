import axios from "axios";

const API_URL = "http://localhost:3001/books";

const bookApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

export const createBook = async (bookData) => {
    try {
        const response = await bookApi.post("", bookData);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Unable to add the book.";

        throw new Error(message);
    }
};

export const getBooks = async () => {
    try {
        const response = await bookApi.get("");
        return response.data;
    } catch (error) {
        throw new Error("Unable to load books.");
    }
};

export const getBookById = async (id) => {
    try {
        const response = await bookApi.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Unable to load book details.");
    }
};