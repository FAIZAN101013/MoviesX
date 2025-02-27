import PropTypes from 'prop-types';
import "../css/MovieCard.css";
import { useMovie } from '../context/moviecontext';

function Moviecard({ movie }) {
    const { addFavorite, removeFavorite, isFavorite } = useMovie();

    const onFavoriteClick = () => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie);
            alert(`${movie.title} removed from Favorites`);
        } else {
            addFavorite(movie);
            alert(`${movie.title} added to Favorites`);
        }
    };

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                />
                <div className="movie-overlay">
                    <button 
                        className="favorite-btn" 
                        onClick={onFavoriteClick}
                        aria-label={isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
                    >
                        <span>{isFavorite(movie.id) ? "❤️" : "🤍"}</span>
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    );
}

Moviecard.propTypes = {
    movie: PropTypes.shape({
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired, // Ensure `id` is defined for `isFavorite`
    }).isRequired,
};

export default Moviecard;
