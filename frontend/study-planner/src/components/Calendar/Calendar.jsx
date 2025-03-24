import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import React, { useEffect, useState } from 'react'
//import './Calendar.css'
function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  // const plugins = [createDragAndDropPlugin(), createEventModalPlugin()]
  // the calander view
  const calendar = useCalendarApp({
    defaultView: viewWeek.name,
    views: [viewWeek, viewDay, viewMonthGrid, viewMonthAgenda],
    plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
    calendars: {
      personal: {
        colorName: 'personal',
        lightColors: {
          main: '#f9d71c',
          container: '#fff5aa',
          onContainer: '#594800',
        },
        darkColors: {
          main: '#fff5c0',
          onContainer: '#fff5de',
          container: '#a29742',
        },
      },
    },
    events: [
      {
        id: 1,
        title: 'Event 1',
        start: '2025-11-18', //due date
        end: '2025-11-18',
        description: 'Description 1',
        hardLevel: 'Hard',
        completeLevel: 'Complete',
        duration: '2 hours',
        calendarId: 'personal',
      },
      {
        id:2,
        title: 'Event 2',
        start: '2025-03-18', //due date
        end: '2025-03-18',
        description: 'Description 1',
        hardLevel: 'Hard',
        completeLevel: 'Complete',
        duration: '2 hours',
        calendarId: 'personal',
      }
    ],
  })

  // eventModal.close(); // close the modal
 
  return (
    <div >
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
    

  )
}
 
export default CalendarApp;