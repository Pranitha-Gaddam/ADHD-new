import "react";
import PropTypes from "prop-types";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {getInitials(userInfo.fullName)}
        </div>
        <div className="leading-tight" style={{ fontFamily: "Times New Roman, serif" }}>
          <p className="text-base font-semibold text-white tracking-wide mb-0.5">
            {capitalizeName(userInfo.fullName)}
          </p>
          <button
            className="text-sm underline cursor-pointer text-white tracking-wide"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileInfo;
