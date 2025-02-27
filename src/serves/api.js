const API_KEY = "8ebfd5ea68c40e46fddd6d9063b8683d";
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetch popular movies from TMDB API
 * @returns {Promise<Array>} Array of popular movie objects
 */
export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched Popular Movies:", data.results); // Debugging log
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return []; // Return empty array on error
  }
};

/**
 * Search for movies on TMDB API
 * @param {string} query - Search query string
 * @returns {Promise<Array>} Array of searched movie objects
 */
export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Search Results for "${query}":`, data.results); // Debugging log
    return data.results;
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    return []; // Return empty array on error
  }
};
