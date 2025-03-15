import React from "react";
import Calendar from "../../components/Calendar/Calendar";
import Nav from "../../components/Navbar/Nav";  

const CalendarPage = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Navbar on the left, takes only the space it needs */}
      <div className="w-20 flex-shrink-0 bg-gray-800 text-white p-4 z-20">
        <Nav />
      </div>

      {/* Calendar on the right, fills remaining space */}
      <div className="flex-1 overflow-auto p-4">
        <Calendar className="w-full h-full" />
      </div>
    </div>
  );
};

export default CalendarPage;
