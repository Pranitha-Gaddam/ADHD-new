import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

function formatDateToDesiredFormat(dateString) {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate)) {
    return "2025-01-01 00:00";
  }
  return format(parsedDate, "yyyy-MM-dd HH:mm");
}

function CalendarApp(props) {
  // Initialize the event service plugin separately
  const eventsService = useState(() => createEventsServicePlugin())[0];

  // Create calendar instance
  const calendar = useCalendarApp({
    defaultView: viewWeek.name,
    views: [viewWeek, viewDay, viewMonthGrid, viewMonthAgenda],
    plugins: [
      createDragAndDropPlugin(),
      createEventModalPlugin(),
      eventsService,
    ],
    calendars: {
      personal: {
        colorName: "personal",
        lightColors: {
          main: "#f9d71c",
          container: "#fff5aa",
          onContainer: "#594800",
        },
        darkColors: {
          main: "#fff5c0",
          onContainer: "#fff5de",
          container: "#a29742",
        },
      },
    },
  });

  // Add events after calendar is initialized and tasks change
  useEffect(() => {
    if (!props.tasks || props.tasks.length === 0) return;

    props.tasks.forEach((task, index) => {
      const startdate = formatDateToDesiredFormat(
        task.dueDate || "2025-03-25 08:00"
      );
      const enddate = formatDateToDesiredFormat(
        task.dueDate || "2025-03-25 12:00"
      );

      const newEvent = {
        id: String(index + 1),
        title: task.title || "Untitled Event",
        start: startdate,
        end: enddate,
        calendarId: "personal",
      };

      console.log("Adding event:", newEvent);

      // Add to calendar
      eventsService.add(newEvent);
    });
  }, [props.tasks, eventsService]);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}
CalendarApp.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      dueDate: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

export default CalendarApp;
