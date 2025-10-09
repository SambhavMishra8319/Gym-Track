import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WorkoutSetTrack from "./WorkoutSetTrack";
import WorkoutCategory from "./WorkoutCategory";
import ExerciseDetail from "./ExerciseDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<WorkoutSetTrack />} />
          <Route path="/category/:name" element={<WorkoutCategory />} />
          <Route path="/exercise/:name" element={<ExerciseDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
