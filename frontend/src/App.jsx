import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Books from './pages/Books';
import BookForm from './pages/BookForm';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/new"
            element={
              <PrivateRoute>
                <BookForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/edit/:id"
            element={
              <PrivateRoute>
                <BookForm />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/books" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
