import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import ExerciseDetailsPage from "./pages/ExerciseDetailsPage/ExerciseDetailsPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/exercises/:id" element={<ExerciseDetailsPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
