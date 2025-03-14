import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import React, { useEffect, useState } from "react";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  // the calander view
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: 1,
        title: "Event 1",
        start: "2024-11-18", //due date
        end: "2024-11-18",
        description: "Description 1",
        hardLevel: "Hard",
        completeLevel: "Complete",
        duration: "2 hours",
      },
    ],
  });

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
