import React, { useEffect, useState } from "react";
import CalendarApp from "../../components/Calendar/Calendar";
import Nav from "../../components/Navbar/Nav";

import NoteCard from "../../components/Cards/NoteCard";
import axiosInstance from "../../utils/axiosInstance";

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);

  const handleEdit = (task) => {
    // Implement the edit functionality here
    console.log("Edit task:", task);
  };

  const deleteTask = (task) => {
    // Implement the delete functionality here
    console.log("Delete task:", task);
  };

  const updateIsCompleted = (task) => {
    // Implement the update functionality here
    console.log("Update task completion status:", task);
  };

  const updateIsPinned = (task) => {
    // Implement the update functionality here
    console.log("Update task pinned status:", task);
  };

  useEffect(() => {
    // Fetch tasks data from an API or other source
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/get-all-tasks"); // Replace with your API endpoint
        if (response.data && response.data.tasks) {
          setTasks(response.data.tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex h-screen pt-15">
      {/* Navbar on the left, takes only the space it needs */}
      <div className="w-20">
        <Nav />
      </div>

      {/* Calendar on the right, fills remaining space */}
      <div className="flex-1">
        <CalendarApp tasks={tasks}/>
      </div>

      {/* task list and add task list */}
      <div className="w-1/6 flex flex-col p-4">
        <div className="pb-10">
          <h1>Task List</h1>
          <ul>
            {tasks.map((task) => {
              console.log("Task Due Date:", task.dueDate); // Log the due date
              return (
                <NoteCard
                  key={task._id}
                  title={task.title}
                  content={task.content}
                  tags={task.tags}
                  dueDate={task.dueDate}
                  reminderTime={task.reminderTime}
                  isPinned={task.isPinned}
                  isCompleted={task.isCompleted}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => deleteTask(task)}
                  onPinNote={() => updateIsPinned(task)}
                  onToggleComplete={() => updateIsCompleted(task)}
                />
              );
            })}
          </ul>
        </div>
        <div>
          <h1>Add Task</h1>
          <input type="text" placeholder="Task Name" />
          <input type="text" placeholder="Task Description" />
          <input type="text" placeholder="Task Due Date" />
          <button>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
