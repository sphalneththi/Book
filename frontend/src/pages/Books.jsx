import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import '../styles/books.css';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await client.get('/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await client.delete(`/books/${id}`);
      setBooks(books.filter(b => b.id !== id));
      setFilteredBooks(filteredBooks.filter(b => b.id !== id));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  const handleSearchByYear = async (e) => {
    e.preventDefault();
    if (!searchYear) {
      setFilteredBooks(books);
      return;
    }

    try {
      const response = await client.get(`/books/year/${searchYear}`);
      setFilteredBooks(response.data);
    } catch (err) {
      setError('Failed to search by year');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="books-container">
      <header className="books-header">
        <h1>Library System</h1>
        <div className="user-info">
          <span>{user?.username} ({user?.role})</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="books-main">
        <div className="controls">
          {user?.role === 'ADMIN' && (
            <button onClick={() => navigate('/books/new')} className="create-btn">
              Add New Book
            </button>
          )}
          <form onSubmit={handleSearchByYear} className="search-form">
            <input
              type="number"
              placeholder="Search by year..."
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
            />
            <button type="submit">Search</button>
            <button type="button" onClick={() => {
              setSearchYear('');
              setFilteredBooks(books);
            }}>Clear</button>
          </form>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading books...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="no-books">No books found</div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Year:</strong> {book.publicationYear}</p>
                <p><strong>Shelf:</strong> {book.shelfLocation}</p>
                <div className="book-actions">
                  {user?.role === 'ADMIN' && (
                    <>
                      <button
                        onClick={() => navigate(`/books/edit/${book.id}`)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
