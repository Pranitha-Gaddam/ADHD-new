import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import mascot from "../../assets/images/mascot.svg"; // Add your mascot image

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
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
        // Redirect to home page
        navigate("/dashboard");
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
      
      {/* Welcome Text - Positioned on the Right but Centered Inside */}
      <div className="flex justify-end items-center mt-16 mb-6 mr-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#1f2e3d] font-[Quintessential] mb-4">
            Welcome Back...
          </h2>
          <h3 className="text-3xl font-extrabold text-[#1f2e3d] font-[Quintessential]">
            Let's get back to studying!
          </h3>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 w-full">
        <div className="w-full flex justify-center items-center">
          <div className="mascot-container flex justify-center items-center mr-10">
            <img src={mascot} alt="Mascot" className="mascot-image w-80 h-80" />
          </div>

          {/* SignUp Style for Login Box */}
          <div className="form-container bg-white p-6 rounded-lg shadow-lg w-full max-w-xl flex flex-col items-start">
            <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full">
              <div className="flex flex-col space-y-2 w-full">
                <label htmlFor="email" className="text-lg font-semibold text-[#f9f5ec]">
                  Email
                </label>
                <input
                  type="text"
                  className="form-input p-3 rounded-lg border border-gray-300 w-full"
                  placeholder="john.doe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <label htmlFor="password" className="text-lg font-semibold text-[#f9f5ec]">
                  Password
                </label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              <button
                type="submit"
                className="btn-primary w-full py-3 mt-4 text-white font-semibold rounded-lg bg-green-500 hover:bg-green-400"
              >
                Login
              </button>

              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="font-medium text-blue-600 underline"
                >
                  Create One!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="quote-banner bg-[#F8F5EC] text-[#1f2e3d] text-center py-5 text-xl font-[Quintessential]">
        "Stay organized, stay motivated, and make studying work for YOU."
      </div>
    </>
  );
};

export default Login;
