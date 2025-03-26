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
import { format, addDays } from "date-fns";

function formatDateToDesiredFormat(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    console.warn(`Invalid date: ${date}, defaulting to 2025-03-26 00:00`);
    return "2025-03-26 00:00";
  }
  return format(date, "yyyy-MM-dd HH:mm");
}

function CalendarApp({ tasks, habits }) {
  const [eventsService] = useState(() => createEventsServicePlugin());
  const [currentEventIds, setCurrentEventIds] = useState(new Set());

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

  // Helper function to generate recurring dates for habits
  const generateRecurringDates = (habit) => {
    const dates = [];
    const now = new Date();
    const endDate = addDays(now, 21); // 3 weeks from the current date

    let currentDate = new Date(now);

    while (currentDate <= endDate) {
      if (shouldAddHabitEvent(habit, currentDate)) {
        // Loop through each notify time in the habit
        habit.notify.forEach((time) => {
          const [hours, minutes] = time.split(":").map(Number); // Parse the time (e.g., "08:00")
          const startDate = new Date(currentDate);
          startDate.setHours(hours, minutes, 0, 0); // Set the start time for the event

          const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour to the start time

          dates.push({ start: startDate, end: endDate }); // Push both start and end times
        });
      }
      currentDate = addDays(currentDate, 1); // Increment by one day
    }
    return dates;
  };
  const shouldAddHabitEvent = (habit, date) => {
    const dayOfWeek = date.getDay();

    switch (habit.repeat) {
      case "daily":
        return true;
      case "weekdays":
        return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
      case "weekends":
        return dayOfWeek === 0 || dayOfWeek === 6; // Saturday and Sunday
      case "weekly":
        return isSameDayOfWeek(habit.createdOn, date); // Same day of the week as the habit creation date
      case "biweekly":
        return isNthWeekFromStart(habit.createdOn, date, 2); // Every 2 weeks

      default:
        return false;
    }
  };

  // Helper function to check if the date is the same day of the week as the start date
  const isSameDayOfWeek = (startDate, date) => {
    const startDayOfWeek = new Date(startDate).getDay();
    return startDayOfWeek === date.getDay();
  };

  // Helper function to check if the date is the nth week from the start date
  const isNthWeekFromStart = (startDate, date, n) => {
    const start = new Date(startDate);
    const diffInDays = Math.floor((date - start) / (1000 * 60 * 60 * 24));
    return diffInDays >= 0 && diffInDays % (n * 7) === 0; // Check if the difference in days is a multiple of n weeks
  };

  // Sync events with tasks and habits whenever they change
  useEffect(() => {
    if ((!tasks || tasks.length === 0) && (!habits || habits.length === 0)) {
      console.log("No tasks or habits provided, removing all events.");
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
      // Combine tasks and habits into a single list of events
      const allEvents = [];

      if (tasks && tasks.length > 0) {
        console.log("Adding tasks to events...");
        tasks.forEach((task, index) => {
          const eventId = task._id || String(index + 1); // Prefer task._id if available

          // Parse the dueDate as a Date object
          const startDateObj = new Date(task.dueDate);

          if (isNaN(startDateObj)) {
            console.warn(
              `Invalid dueDate: ${task.dueDate}, defaulting to 2025-03-25 08:00`
            );
            startDateObj.setHours(8, 0, 0, 0); // Default to 08:00
          }

          // Calculate the end time by adding 1 hour to the start time
          const endDateObj = new Date(startDateObj.getTime() + 60 * 60 * 1000); // Add 1 hour

          // Format the start and end dates to the desired format
          const startdate = formatDateToDesiredFormat(startDateObj);
          const enddate = formatDateToDesiredFormat(endDateObj);

          allEvents.push({
            id: eventId,
            title: task.title || "Untitled Task",
            start: startdate,
            end: enddate, // Add the end time
            calendarId: "personal",
          });
        });
      }

      // Add habits to the events list
      if (habits && habits.length > 0) {
        console.log("Adding habits to events...");
        habits.forEach((habit) => {
          const recurringDates = generateRecurringDates(habit); // Generate recurring dates for the habit
          recurringDates.forEach((date, index) => {
            const eventId = `${habit._id}-${index}`; // Unique ID for each recurring event
            const startdate = formatDateToDesiredFormat(date.start);
            const enddate = formatDateToDesiredFormat(date.end);

            allEvents.push({
              id: eventId,
              title: habit.name || "Untitled Habit",
              start: startdate,
              end: enddate,
              calendarId: "personal",
            });
          });
        });
      }

      console.log("All Events:", allEvents);

      // Remove old events that are no longer in tasks or habits
      const newEventIds = new Set(allEvents.map((event) => event.id));
      currentEventIds.forEach((id) => {
        if (!newEventIds.has(id)) {
          try {
            eventsService.remove(id);
            console.log(`Removed event with ID: ${id}`);
          } catch (error) {
            console.error(`Failed to remove event with ID ${id}:`, error);
          }
        }
      });

      // Add or update events in the calendar
      const updatedEventIds = new Set();
      allEvents.forEach((event) => {
        if (currentEventIds.has(event.id)) {
          eventsService.update(event); // Update if it already exists
          console.log(`Updated event with ID: ${event.id}`);
        } else {
          eventsService.add(event); // Add if it’s new
          console.log(`Added event with ID: ${event.id}`);
        }
        updatedEventIds.add(event.id);
      });

      // Update the tracked event IDs
      setCurrentEventIds(updatedEventIds);
      console.log("All events processed successfully.");
    } catch (error) {
      console.error("Error syncing events with calendar:", error);
    }
  }, [tasks, habits, eventsService]);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

CalendarApp.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      dueDate: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      notify: PropTypes.string,
      name: PropTypes.string,
      repeat: PropTypes.string,
    })
  ),
};

export default CalendarApp;
