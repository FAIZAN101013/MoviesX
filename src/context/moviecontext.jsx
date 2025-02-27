import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPopularMovies } from "../serves/api";


const MovieContext = createContext();

export const useMovie = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("Favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (movie) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    movies,
    searchQuery,
    setSearchQuery,
    error,
    loading,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MovieContext;
