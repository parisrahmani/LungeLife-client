import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import ExerciseDetailsPage from "./pages/ExerciseDetailsPage/ExerciseDetailsPage";
import StartWorkoutPage from "./pages/StartWorkoutPage/StartWorkoutPage";

import SignInPage from "./pages/SignInPage/SignInPage";
import Footer from "./components/Footer/Footer";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/exercises/:id" element={<ExerciseDetailsPage />} />
        <Route path="/start" element={<StartWorkoutPage />} />
        <Route path="/start/:id" element={<StartWorkoutPage />} />
        {/* <Route path="/templates/" element={<HomePage />} /> */}
        <Route path="/add" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
