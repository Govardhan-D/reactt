import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="flex flex-row justify-between w-full text-white">
      <Link to="/">LetterBoxd</Link>
      <Link to="/Favorites">Favorites</Link>
    </nav>
  );
}
