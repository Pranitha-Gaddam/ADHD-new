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
<<<<<<< HEAD
    console.warn(
      `Invalid date string: ${dateString}, defaulting to 2025-01-01 00:00`
    );
=======
>>>>>>> dae02dbb05d8f7b5c3ba394ca85bb5731e927695
    return "2025-01-01 00:00";
  }
  return format(parsedDate, "yyyy-MM-dd HH:mm");
}

function CalendarApp(props) {
<<<<<<< HEAD
  // Initialize the event service plugin
  const [eventsService] = useState(() => createEventsServicePlugin());
  const [currentEventIds, setCurrentEventIds] = useState(new Set()); // Track event IDs
=======
  // Initialize the event service plugin separately
  const eventsService = useState(() => createEventsServicePlugin())[0];
>>>>>>> dae02dbb05d8f7b5c3ba394ca85bb5731e927695

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

  // Sync events with tasks whenever tasks change
  useEffect(() => {
<<<<<<< HEAD
    if (!props.tasks || props.tasks.length === 0) {
      console.log("No tasks provided, removing all events.");
      currentEventIds.forEach((id) => {
        try {
          eventsService.remove(id);
        } catch (error) {
          console.error(`Failed to remove event with ID ${id}:`, error);
        }
      });
      setCurrentEventIds(new Set());
      return;
    }

    try {
      // Remove old events that are no longer in props.tasks
      const newTaskIds = new Set(
        props.tasks.map(
          (task) => task._id || String(props.tasks.indexOf(task) + 1)
        )
      );
      currentEventIds.forEach((id) => {
        if (!newTaskIds.has(id)) {
          try {
            eventsService.remove(id);
            console.log(`Removed event with ID: ${id}`);
          } catch (error) {
            console.error(`Failed to remove event with ID ${id}:`, error);
          }
        }
      });

      // Add or update events based on current tasks
      const updatedEventIds = new Set();
      props.tasks.forEach((task, index) => {
        const eventId = task._id || String(index + 1); // Prefer task._id if available
        const startdate = formatDateToDesiredFormat(
          task.dueDate || "2025-03-25 08:00"
        );
        const enddate = formatDateToDesiredFormat(
          task.dueDate || "2025-03-25 12:00"
        );

        const newEvent = {
          id: eventId,
          title: task.title || "Untitled Event",
          start: startdate,
          end: enddate,
          calendarId: "personal",
        };

        console.log("Processing event:", newEvent);

        // Add or update the event
        if (currentEventIds.has(eventId)) {
          eventsService.update(newEvent); // Update if it already exists
          console.log(`Updated event with ID: ${eventId}`);
        } else {
          eventsService.add(newEvent); // Add if it’s new
          console.log(`Added event with ID: ${eventId}`);
        }
        updatedEventIds.add(eventId);
      });

      // Update the tracked event IDs
      setCurrentEventIds(updatedEventIds);
      console.log("All events processed successfully.");
    } catch (error) {
      console.error("Error syncing events with calendar:", error);
    }
=======
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
>>>>>>> dae02dbb05d8f7b5c3ba394ca85bb5731e927695
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

<<<<<<< HEAD
CalendarApp.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string, // Add _id to prop types
      dueDate: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

=======
>>>>>>> dae02dbb05d8f7b5c3ba394ca85bb5731e927695
export default CalendarApp;
