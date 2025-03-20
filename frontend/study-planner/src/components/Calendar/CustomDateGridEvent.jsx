import React from 'react';

/**
 * @typedef {Object} CalendarEvent
 * @property {string | number} id
 * @property {string} title
 * @property {string} start
 * @property {string} end
 */

/**
 * @param {{ calendarEvent: CalendarEvent }} props
 */
function CustomDateGridEvent({ calendarEvent }) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          background: 'green',
          color: 'white',
          padding: '2px',
          borderRadius: 5,
          border: '1px solid white',
        }}
      >
        {calendarEvent.title}
      </div>
    );
  }
  
  export default CustomDateGridEvent;
