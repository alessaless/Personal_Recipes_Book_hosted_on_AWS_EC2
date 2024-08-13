import './App.css';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // Importa il componente ProtectedRoute

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                {/* Proteggi tutte le altre rotte con ProtectedRoute */}
                <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
                <Route path="/ricette" element={<ProtectedRoute element={<RecipesPage />} />} />
                <Route path="/ricetta/:id" element={<ProtectedRoute element={<RecipePage />} />} /> {/* Percorso con parametro */}
            </Routes>
        </Router>
    );
}

export default App;
