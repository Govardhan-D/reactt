const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.themoviedb.org/3";
async function fetchPopular() {
  try {
    let response = await fetch(
      `${baseURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    );
    let data = await response.json();
    return data.results;
  } catch (error) {
    return error;
  }
}

async function searchMovies(query) {
  try {
    let response = await fetch(
      `${baseURL}/search/movie?query=${query}&language=en-US&page=1&include_adult=false&api_key=${apiKey}`,
    );
    let data = await response.json();
    return data.results;
  } catch (error) {
    return error;
  }
}

export { searchMovies, fetchPopular };
