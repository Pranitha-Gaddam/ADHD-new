import React from "react";
import PropTypes from "prop-types";

const Habits = ({ habits, toggleHabit }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Your Habits:</h3>
      <div className="flex gap-4 mt-2">
        {habits.map((habit, index) => (
          <button
            key={index}
            onClick={() => toggleHabit(index)}
            className="flex flex-col items-center p-2 bg-white shadow rounded-lg"
          >
            <div className="w-16 h-16 flex items-center justify-center text-lg font-bold border-4 border-gray-700 rounded-full">
              {habit.progress}/{habit.goal}
            </div>
            <span className="text-sm mt-1">{habit.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

Habits.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
      goal: PropTypes.number.isRequired,
    })
  ).isRequired,
  toggleHabit: PropTypes.func.isRequired,
};

export default Habits;
