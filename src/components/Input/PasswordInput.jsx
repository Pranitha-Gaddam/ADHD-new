import  { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className='relative flex items-center'>
            <input 
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="form-input w-full pr-10"
            />
            <button 
                type="button" 
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 focus:outline-none cursor-pointer"
            >
                {/* {isShowPassword ? "Hide" : "Show"} */}
            </button>

            {isShowPassword ? <FaEye
            size={22}
            className="text-blue-600 cursor-pointer"
            onClick={() => toggleShowPassword()}
            /> : <FaEyeSlash
            size={22}
            className="text-grey cursor-pointer"
            onClick={() => toggleShowPassword()}
            />}
        </div>
    );
};
PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default PasswordInput;
