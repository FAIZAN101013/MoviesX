import Moviecard from "../components/Moviescards";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../serves/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log("Popular Movies:", popularMovies);
        setMovies(popularMovies);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    if (loading) return;

    try {
      setLoading(true);
      const searchedMovies = await searchMovies(searchQuery);
      console.log("Searched Movies:", searchedMovies);
      setMovies(searchedMovies);
    } catch (err) {
      console.error("Search Error:", err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Moviecard movie={movie} key={movie.id} />
          ))
        ) : (
          !loading && <p className="no-results">No movies found.</p>
        )}
      </div>

      <div className="footer">
        <footer>
          <p>
            © 2024 MoviesX. All rights reserved.
            <br />
            Faizan Patel
            <br />
            <a href="mailto:faizan.m.patel10@gmail.com">faizan.m.patel10@gmail.com</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
