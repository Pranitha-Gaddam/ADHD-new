import "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillCalendar, AiFillClockCircle } from "react-icons/ai";

const Sidebar = () => {
  return (
    <aside className="z-10 h-full w-16 bg-white border-r border-gray-300">
      <nav className="h-full flex flex-col items-center py-4">
        <ul className="flex-1 space-y-8">
          <li className="group relative flex items-center">
            <Link to="/dashboard" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
              <AiFillHome size={32} />
              <span className="absolute left-16 whitespace-nowrap opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gray-700 text-white text-xs rounded py-1 px-2 z-20">
                Home
              </span>
            </Link>
          </li>
          <li className="group relative flex items-center">
            <Link to="/calendar" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
              <AiFillCalendar size={32} />
              <span className="absolute left-16 whitespace-nowrap opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gray-700 text-white text-xs rounded py-1 px-2 z-20">
                Calendar
              </span>
            </Link>
          </li>
          <li className="group relative flex items-center">
            <Link to="/pomodoro" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
              <AiFillClockCircle size={32} />
              <span className="absolute left-16 whitespace-nowrap opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gray-700 text-white text-xs rounded py-1 px-2 z-20">
                Pomodoro
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
