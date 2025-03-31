import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home/Home";
import AuthContainer from "./pages/Auth/AuthContainer";
import StudyMode from "./components/StudyMode/Studymode";
import CalendarPage from "./pages/Calendar/Calendar";
import Detector from "./pages/Detector/Detector";
import Start from "./pages/Detector/Start";
import Results from "./pages/Detector/Results";

import "./index.css";

// Wrapper component to enable AnimatePresence with routing
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/detector" element={<Start />} />
        <Route path="/detector/questions" element={<Detector />} />
        <Route path="/detector/questions/results" element={<Results />} />
        <Route path="/study-mode" element={<StudyMode />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
