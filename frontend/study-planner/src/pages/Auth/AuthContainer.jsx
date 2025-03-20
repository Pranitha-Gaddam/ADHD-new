import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import "./AuthContainer.css";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true); 
  return (
    
    <div className="auth-container">
        
      <div className="form-flip-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "Login" : "SignUp"}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="auth-form-box"
          >
            {isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
          </motion.div>
        </AnimatePresence>
      
      {/* Quote Banner - Static */}
      <div className="quote-banner">
        "Stay organized, stay motivated, and make studying work for YOU."
      </div>
    </div>
    </div>
  );
};

export default AuthContainer;
