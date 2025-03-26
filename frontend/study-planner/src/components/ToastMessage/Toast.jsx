import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline, MdWarning } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        console.log("Closing toast...");
        onClose();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed top-20 right-6 z-50 transition-transform duration-300 transform ${
        isShown
          ? "scale-100 opacity-100"
          : "scale-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative min-w-52 bg-white border shadow-lg rounded-md flex items-center gap-3 py-2 px-4 after:w-[5px] after:h-full after:absolute after:left-0 after:top-0 after:rounded-l-lg
          ${
            type === "delete"
              ? "after:bg-red-500"
              : type === "warning"
              ? "after:bg-yellow-500"
              : "after:bg-green-500"
          }`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full
            ${
              type === "delete"
                ? "bg-red-50"
                : type === "warning"
                ? "bg-yellow-50"
                : "bg-green-50"
            }`}
        >
          {type === "delete" ? (
            <MdDeleteOutline className="text-xl text-red-500" />
          ) : type === "warning" ? (
            <MdWarning className="text-xl text-yellow-500" />
          ) : (
            <LuCheck className="text-xl text-green-500" />
          )}
        </div>
        <p className="text-sm text-slate-800">{message}</p>
      </div>
    </div>
  );
};

Toast.propTypes = {
  isShown: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "delete", "warning"]),
  onClose: PropTypes.func.isRequired,
};

export default Toast;
