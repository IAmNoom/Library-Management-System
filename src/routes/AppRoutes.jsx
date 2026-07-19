import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';
import Layout from '../components/Layout/Layout';
import AddBook from '../pages/AddBook/AddBook';
import BookDetail from '../pages/BookDetail/BookDetail';

/**
 * Placeholder component for pages to be implemented by other team members.
 * Displays an icon, title, and description message.
 */
function PlaceholderPage({ icon, title, message }) {
  return (
    <Layout>
      <div className="placeholder-page">
        <div className="placeholder-icon">{icon}</div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </Layout>
  );
}

/**
 * AppRoutes - Defines all application routes.
 *
 * Routes:
 * /           → Home page
 * /books      → Book List (placeholder - Member 2)
 * /books/:id  → Book Detail (Member 3)
 * /add-book   → Add Book (Member 4)
 * /edit-book/:id → Edit Book (placeholder - Member 5)
 * /about      → About page
 * *           → 404 Not Found
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Book List - To be implemented by Member 2 */}
      <Route
        path="/books"
        element={
          <PlaceholderPage
            icon="📖"
            title="Book List"
            message="Book List will be implemented by Member 2"
          />
        }
      />

      {/* Book Detail - Implemented by Member 3 */}
      <Route path="/books/:id" element={<BookDetail />} />


      {/* Add Book - To be implemented by Member 4 */}
      <Route path="/add-book" element={<AddBook />} />

      {/* Edit Book - To be implemented by Member 5 */}
      <Route
        path="/edit-book/:id"
        element={
          <PlaceholderPage
            icon="✏️"
            title="Edit Book"
            message="Edit Book will be implemented by Member 5"
          />
        }
      />

      {/* About page */}
      <Route path="/about" element={<About />} />

      {/* 404 Not Found - Catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
