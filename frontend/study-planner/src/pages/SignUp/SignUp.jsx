import "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput"; // Import PasswordInput component
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import "./SignUp.css";
import mascot from "../../assets/images/mascot.svg";

const SignUp = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // SignUp API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        // Redirect to home page
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      // Handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="mascot-container">
          <img src={mascot} alt="Mascot" className="mascot-image" />
        </div>
        <div className="signup-content">
          <h2 className="signup-title">
            <span className="signup-line1">Welcome to Your</span>
            <span className="signup-line2">ADHD Study Planner!</span>
          </h2>
          <div className="form-container">
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-input"
                  placeholder="john.doe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="submit-button">
                Get Started
              </button>

              <p className="redirect-text">
                Already have an account?{" "}
                <span className="login-link" onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default SignUp;
