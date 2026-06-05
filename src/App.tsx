import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { ShowPage } from "./pages/ShowPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { PersonPage } from "./pages/PersonPage";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/show/:id" element={<ShowPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/person/:id" element={<PersonPage />} />
        </Route>
      </Routes>
    </>
  );
}
