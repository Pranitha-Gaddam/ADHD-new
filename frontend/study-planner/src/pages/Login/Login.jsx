import "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput"; // Import PasswordInput component
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import "./Login.css";
import mascot from "../../assets/images/mascot.svg";

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

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

    // Login API call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
        return;
      }
    } catch (error) {
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
      <div className="login-container">
        <div className="mascot-container">
          <img src={mascot} alt="Mascot" className="mascot-image" />
        </div>
        {/* Divider Line */}
    <div className="divider"></div>
        <div className="login-content">
          <h2 className="login-title">
            <span className="login-line1">Welcome Back!</span>
            <span className="login-line2">Let's get back to studying!</span>
          </h2>
          <div className="form-container">
            <form onSubmit={handleLogin}>
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
                Login
              </button>

              <p className="redirect-text">
                Don't have an account?{" "}
                <span className="signup-link" onClick={() => setIsLogin(false)}>
                  Join Us
                </span>
                </p>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Login;
