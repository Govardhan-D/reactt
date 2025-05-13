import { useState, useEffect, useRef } from "react";
import { fetchPopular, searchMovies } from "../services/api.js";
import MovieCard from "../components/MovieCard";
import MovieContextProvider from "../contexts/moviecontext";
import NavBar from "../components/NavBar";
export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const popularMovies = useRef([]);

  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  useEffect(() => {
    async function fetchMovies() {
      let data = await fetchPopular();
      popularMovies.current = data;
      setMovies(data);
      setLoading(false);
    }
    fetchMovies();
  }, []);
  useEffect(() => {
    if (!query.trim()) {
      setMovies(popularMovies.current);
      return;
    }
    const handler = setTimeout(() => {
      async function search() {
        setLoading(true);
        let temp_movies = await searchMovies(query);
        console.log(temp_movies);
        setMovies(temp_movies);
        setLoading(false);
      }
      search();
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);
  return (
    <div className="w-full bg-[#2E282A] min-h-screen flex flex-col items-center p-10 text-white">
      <NavBar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl mb-4">LetterBoxd</h1>
        <input
          type="text"
          className="bg-[#F4F7F5] w-[400px] h-[35px] shadow-sm p-2 text-black"
          value={query}
          onChange={handleQuery}
        />
      </div>
      {movies === popularMovies.current ? (
        <p>You are now seeing Popular movies</p>
      ) : (
        <p>Search results for {query}</p>
      )}

      <div className="grid grid-cols-4 gap-5 mt-5">
        {loading && <p>Loading</p>}

        {!loading &&
          movies.length > 0 &&
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
}
