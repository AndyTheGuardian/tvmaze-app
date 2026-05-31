import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { ShowPage } from "./pages/ShowPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/show/:id" element={<ShowPage />} />
    </Routes>
  );
}
