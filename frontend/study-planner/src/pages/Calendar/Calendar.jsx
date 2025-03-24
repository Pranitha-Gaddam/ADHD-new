import React from "react";
import CalendarApp from "../../components/Calendar/Calendar";
import Nav from "../../components/Navbar/Nav";  
import NoteCard from "../../components/Cards/NoteCard";

const CalendarPage = () => {
  return (
    <div className="flex h-screen pt-15">
      {/* Navbar on the left, takes only the space it needs */}
      <div className="w-20">
        <Nav />
      </div>

      {/* Calendar on the right, fills remaining space */}
      <div className="flex-1">
        <CalendarApp />
      </div>

      {/* task list and add task list */}
      <div className="w-1/6 flex flex-col p-4">
        {/* <TaskList /> */}
        <div className="pb-10">
          <h1>Task List</h1>
          <ul>
            <li>Task 1</li>
            <li>Task 2</li>
            <li>Task 3</li>
          </ul>
        </div>
        {/* <AddTask /> */} 
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
