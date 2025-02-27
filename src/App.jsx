// Importing the CSS file for styling
import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/home';
import Favorites from './pages/favorites';
import NavBar from './components/navbar'; // Make sure this path points to your NavBar component
import { MovieProvider } from './context/moviecontext';

// The main component of the application
function App() {
  console.log('App component rendered');

  return (
    <MovieProvider>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* Fallback route for non-matching paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
