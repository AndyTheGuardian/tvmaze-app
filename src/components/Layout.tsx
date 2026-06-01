import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen pb-16 text-white">
      <Outlet />

      <nav
        className="
            fixed 
            bottom-0
            left-0
            right-0
            z-50
            flex
            justify-around
            bg-black/80
            p-4
            "
      >
        <Link to="/">Shows</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </div>
  );
}
