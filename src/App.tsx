import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { ShowPage } from "./pages/ShowPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/show/:id" element={<ShowPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}
