// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Auth/SignUp';
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/home/Home';
import ProtectedRoute from './components/general/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;