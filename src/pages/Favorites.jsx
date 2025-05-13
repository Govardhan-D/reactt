import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import { useMovieContext } from "../contexts/moviecontext";

export default function Favorites() {
  const { favorites } = useMovieContext();
  return (
    <div className="w-full bg-[#2E282A] min-h-screen flex flex-col items-center p-10 text-white">
      <NavBar />
      {favorites.length == 0 && <p>You have no favorites</p>}

      <div className="grid grid-cols-4 gap-5 mt-5">
        {favorites.length > 0 &&
          favorites.map((favorite) => {
            return <MovieCard movie={favorite} key={favorite.id} />;
          })}
      </div>
    </div>
  );
}
