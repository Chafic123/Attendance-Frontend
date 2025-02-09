import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../CSS/SICalender.css'; // Import your custom CSS file

export default function CustomMonthLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.toDateString());
    // Add your custom logic here
  };

  return (
    <div className="custom-calendar-wrapper">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) =>
          view === 'month' && date.toDateString() === selectedDate.toDateString()
            ? 'react-calendar__tile--active'
            : ''
        }
      />
    </div>
  );
}
