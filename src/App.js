
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home.jsx';
import Detail from './pages/detail.jsx';

function App() {
  return (
    <Routes>
      {/* La route par défaut qui charge le composant Home */}
      <Route index element={<Home />} />
      
      {/* Route dynamique pour l'article, l'ID sera récupéré dans la page Detail */}
      <Route path="/article/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;

