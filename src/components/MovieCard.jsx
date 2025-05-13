import { useMovieContext } from "../contexts/moviecontext";
export default function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const handleFavorite = (e) => {
    e.preventDefault();
    if (!favorite) {
      addToFavorites(movie);
    } else {
      removeFromFavorites(movie.id);
    }
  };
  return (
    <div className="shadow-lg relative bg-white p-2 flex flex-col justify-center items-center rounded-lg gap-5 w-[350px]">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        className="w-full h-full object-cover"
      />

      <button className="absolute top-2 left-2 z-50" onClick={handleFavorite}>
        {favorite ? "💖" : "🤍"}
      </button>

      <p>{movie.title}</p>
    </div>
  );
}
