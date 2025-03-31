import React from "react";
import PropTypes from "prop-types";

const GreetingCard = ({ username }) => {
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const capitalizeName = (name) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-md inline-block" style={{ fontFamily: 'Times New Roman, serif' }}>
      <h1 className="text-2xl font-bold text-slate-800">
        {`${getGreetingMessage()}, ${capitalizeName(username)}!`}
      </h1>
    </div>
  );
};

GreetingCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GreetingCard;
