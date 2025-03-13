import React from "react";
import CalendarApp from "../../components/Calendar/Calendar";
import Sidebar from "../../components/Sidebar/Sidebar";

const CalendarPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (adjusts width dynamically) */}
      <Sidebar />

      {/* Calendar takes remaining space */}
      <div className="flex-1 overflow-auto">
        <CalendarApp />
      </div>
    </div>
  );
};

export default CalendarPage;
