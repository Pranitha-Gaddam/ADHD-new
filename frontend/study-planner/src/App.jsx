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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/study-mode" element={<StudyMode />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
