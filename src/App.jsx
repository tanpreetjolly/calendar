import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventDelete = (eventToDelete) => {
    const updatedEvents = events.filter(event => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">Calendar with Highlighted Dates</h1>
      <div className="flex flex-col gap-4">
        <div >
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
        <div >
          <div className="bg-white shadow-md rounded-md p-4">
            <EventForm
              selectedDate={selectedDate}
              onEventAdd={handleEventAdd}
            />
            <EventsList
              events={events}
              selectedDate={selectedDate}
              onDelete={handleEventDelete}
            />
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
        Add To List
      </button>
    </div>
  );
}

function EventsList({ events, selectedDate, onDelete }) {
  const selectedEvents = events.filter(event => event.start.toDateString() === selectedDate.toDateString());

  return (
    <div className="mt-4">
      {selectedEvents.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Events on {selectedDate.toDateString()}
          </h3>
          <ul>
            {selectedEvents.map((event, index) => (
              <Event
                key={index}
                event={event}
                onDelete={() => onDelete(event)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Event({ event, onDelete }) {
  return (
    <li className="mb-1 flex justify-between items-center">
      <span className="bg-gray-300 px-2 py-1 rounded-lg">
        {event.title}
      </span>
      <button
        className="text-red-600 hover:text-red-800"
        onClick={onDelete}
      >
        X
      </button>
    </li>
  );
}

export default App;
