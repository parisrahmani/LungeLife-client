import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import ExerciseDetailsPage from "./pages/ExerciseDetailsPage/ExerciseDetailsPage";
import StartWorkoutPage from "./pages/StartWorkoutPage/StartWorkoutPage";
import Progress from "./pages/Progress/Progress";

import SignInPage from "./pages/SignInPage/SignInPage";
import Footer from "./components/Footer/Footer";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/exercises/:id" element={<ExerciseDetailsPage />} />
        <Route path="/start" element={<StartWorkoutPage />} />
        <Route path="/start/:id" element={<StartWorkoutPage />} />
        <Route path="/add" element={<HomePage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
