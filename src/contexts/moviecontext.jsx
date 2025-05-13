import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export default function MovieContextProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      console.log("Failed to retrieve from local storage.");
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      console.log("Error while adding item");
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (isFavorite(movie.id)) {
      console.log("Movie is already added");
      return;
    }
    setFavorites((prev) => [...prev, movie]);
  };
  const removeFromFavorites = (movieID) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieID));
  };
  const isFavorite = (movieID) => {
    return favorites.some((movie) => movie.id === movieID);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
