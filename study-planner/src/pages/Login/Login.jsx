import 'react';
import Navbar from "../../components/Navbar";
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  return (
    <>
      <Navbar />
      <div>
        <div>
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input type="text" className="input-box" placeholder="Email" />

            <button type="submit" className="btn-primary">Login</button>

            <p className="text-sm-text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="">
                Create an account
              </Link>

            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login