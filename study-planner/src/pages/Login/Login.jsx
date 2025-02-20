import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { Link } from 'react-router-dom';
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from '../../utils/helper';

const Login = () => {
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
  }
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border border-white py-10 rounded px-7"> 
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input 
              type="text" 
              className="input-box" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">Login</button>

            <p className="text-sm-text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signUp" className="font-medium text-primary text-amber-300 underline">
                Create an account
              </Link>

            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;