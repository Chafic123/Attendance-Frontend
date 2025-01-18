import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function CustomMonthLayout() {
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        sx={{
          width: '50%',
          margin: 'auto',
          color: '#482B70',
          border: 'none',
          backgroundColor: 'rgb(245, 243, 253)',

          // Day names
          '& .MuiDayPicker-weekDay': {
            fontWeight: 'bold',
            color: '#543381',
          },

          // Days of the month
          '& .MuiDayPicker-day': {
            borderRadius: '50%',
            fontSize: '14px',
            color: '#47494D', 
          },

          // Style the selected date
          '& .Mui-selected': {
            backgroundColor: '#584B9F', 
            color: '#FFFFFF', 
          },

          // Disabled dates 
          '& .MuiDayPicker-dayOutsideMonth': {
            color: '#86888B', 
          },
        }}
      />

    </LocalizationProvider>
  );
}
