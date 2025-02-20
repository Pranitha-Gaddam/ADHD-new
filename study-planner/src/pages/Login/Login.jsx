import 'react';
import Navbar from "../../components/Navbar/Navbar";
import { Link } from 'react-router-dom';
import PasswordInput from "../../components/Input/PasswordInput";


const Login = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border border-white py-10 rounded px-7"> 
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input type="text" className="input-box" placeholder="Email" />

            <PasswordInput />
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