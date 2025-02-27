import "../css/Favorites.css";
import { useMovie } from "../context/moviecontext";  // ✅ Correct import
import MovieCard from "../components/Moviescards"; // Ensure the path is correct

function Favorites() {
  const { favorites } = useMovie(); // ✅ Use the custom hook

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <NoFavoritesMessage />
      )}
    </div>
  );
}

function NoFavoritesMessage() {
  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites, and they will appear here!</p>
    </div>
  );
}

export default Favorites;
