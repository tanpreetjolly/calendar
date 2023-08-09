import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedEvents(events.filter(event => event.start.toDateString() === date.toDateString()));
  };

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
    if (newEvent.start.toDateString() === selectedDate.toDateString()) {
      setSelectedEvents([...selectedEvents, newEvent]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">Calendar with Highlighted Dates</h1>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={({ date, view }) =>
              events.some(
                (event) =>
                  event.start.toDateString() === date.toDateString()
              ) && view === 'month' ? (
                <div className="highlight"></div>
              ) : null
            }
          />
        </div>
        <div className="w-1/2">
          <div className="bg-white shadow-md rounded-md p-4">
            <EventForm
              selectedDate={selectedDate}
              onEventAdd={handleEventAdd}
            />
            <div className="mt-4">
              {selectedEvents.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Events on {selectedDate.toDateString()}
                  </h3>
                  <ul>
                    {selectedEvents.map((event, index) => (
                      <li key={index} className="mb-1">
                        <span className="bg-gray-300 px-2 py-1 rounded-lg">
                          {event.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventForm({ selectedDate, onEventAdd }) {
  const [eventTitle, setEventTitle] = useState('');

  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleAddEvent = () => {
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        start: selectedDate,
      };

      onEventAdd(newEvent);
      setEventTitle('');
    }
  };

  return (
    <div>
      <p className="mb-2">Selected Date: {selectedDate.toDateString()}</p>
      <input
        type="text"
        placeholder="Event Title"
        value={eventTitle}
        onChange={handleEventTitleChange}
        className="w-full p-2 rounded-md border focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleAddEvent}
        className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
      >
        Add Event
      </button>
    </div>
  );
}

export default App;
