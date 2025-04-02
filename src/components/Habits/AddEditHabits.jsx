import { useState } from "react";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

import axiosInstance from "../../utils/axiosInstance";

const AddEditHabits = ({
  habitData,
  type,
  getAllHabits,
  onClose,
  showToastMessage,
}) => {
  const [name, setName] = useState(habitData?.name || "");
  const [goal, setGoal] = useState(habitData?.goal || 1);
  const [repeat, setRepeat] = useState(habitData?.repeat || "daily");
  const [color, setColor] = useState(habitData?.color || "#000000");
  const [notify, setNotify] = useState(
    habitData?.notify ? [...habitData.notify] : ["08:00"]
  );

  const [error, setError] = useState(null);

  // Add Habit
  const addNewHabit = async () => {
    try {
      const response = await axiosInstance.post("/add-habit", {
        name,
        goal,
        repeat,
        color,
        notify,
      });
      if (response.data && response.data.habit) {
        getAllHabits();
        console.log("Habit added: ", response.data.habit);
        showToastMessage("Habit added successfully!");
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Habit
  const editHabit = async () => {
    const habitId = habitData._id;
    try {
      const response = await axiosInstance.put("/edit-habit/" + habitId, {
        name,
        goal,
        repeat,
        color,
        notify,
      });
      if (response.data && response.data.habit) {
        getAllHabits();
        showToastMessage("Habit updated successfully!");
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddHabit = () => {
    if (!name) {
      setError("Please enter a habit name");
      return;
    }
    if (!goal || goal < 1) {
      setError("Please enter a valid goal (at least 1)");
      return;
    }
    if (notify.some((time) => !time)) {
      setError("Please select a notification time for each section");
      return;
    }

    setError("");

    if (type === "edit") {
      editHabit();
    } else {
      addNewHabit();
    }
  };

  // Handle changes to the goal and adjust notify fields
  const handleGoalChange = (value) => {
    const newGoal = parseInt(value, 10);
    setGoal(newGoal);

    // Adjust the notify array to match the new goal
    if (newGoal > notify.length) {
      // Add new notify fields with default times
      const additionalFields = Array(newGoal - notify.length).fill("08:00");
      setNotify([...notify, ...additionalFields]);
    } else if (newGoal < notify.length) {
      // Remove extra notify fields
      setNotify(notify.slice(0, newGoal));
    }
  };

  // Handle changes to individual notify fields
  const handleNotifyChange = (index, value) => {
    const updatedNotify = [...notify];
    updatedNotify[index] = value;
    setNotify(updatedNotify);
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-7 -right-3 hover:bg-slate-300"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2 mt-5">
        <label className="input-label">Name</label>
        <input
          type="text"
          placeholder="Enter habit name"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-4">
        <label className="block text-sm font-medium text-gray-700">Goal</label>
        <input
          type="number"
          min="1"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={goal}
          onChange={(e) => handleGoalChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-4">
        <label className="block text-sm font-medium text-gray-700">
          Repeat
        </label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekends">Weekends</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
        </select>
      </div>
      <div className="flex flex-col my-4">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="color"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-4">
        <label className="block text-sm font-medium text-gray-700">
          Notify
        </label>
        {notify.map((time, index) => (
          <div key={index} className="flex items-center gap-2 my-2">
            <label className="text-sm font-medium text-gray-700">
              Section {index + 1}:
            </label>
            <input
              type="time"
              className="block w-full p-2 border border-gray-300 rounded"
              value={time}
              onChange={(e) => handleNotifyChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        onClick={handleAddHabit}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

AddEditHabits.propTypes = {
  habitData: PropTypes.object,
  type: PropTypes.string.isRequired,
  getAllHabits: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showToastMessage: PropTypes.func.isRequired,
};

export default AddEditHabits;
