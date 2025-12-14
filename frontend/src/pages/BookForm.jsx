import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import '../styles/books.css';

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
    shelfLocation: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/books');
      return;
    }

    if (id) {
      fetchBook();
    }
  }, []);

  const fetchBook = async () => {
    try {
      const response = await client.get(`/books/${id}`);
      setBook(response.data);
    } catch (err) {
      setError('Failed to fetch book');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'publicationYear' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      if (id) {
        await client.put(`/books/${id}`, book);
      } else {
        await client.post('/books', book);
      }
      navigate('/books');
    } catch (err) {
      setError(err.response?.data || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={book.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="publicationYear"
            placeholder="Publication Year"
            value={book.publicationYear}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="shelfLocation"
            placeholder="Shelf Location"
            value={book.shelfLocation}
            onChange={handleChange}
            required
          />
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Book'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
