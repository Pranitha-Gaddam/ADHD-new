import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthContainer from './pages/Auth/AuthContainer';
import StudyMode from "./components/StudyMode/StudyMode";
import CalendarPage from "./pages/Calendar/Calendar";
import "./index.css";
import Detector from "./pages/Detector/Detector"; 
import Start from "./pages/Detector/Start";
import Results from "./pages/Detector/Results";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/detector" element={<Start />} />
        <Route path="/detector/questions" element={<Detector />} />
        <Route path="/detector/questions/results" element={<Results />} />
        <Route path="/study-mode" element={<StudyMode />} />

      </Routes>
    </Router>
  );
};

export default App;
