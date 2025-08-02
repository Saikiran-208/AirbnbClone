import React from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

function CalendarInput  ({value, onChange,disabledDates, ...props}) {
   
    
  return (
    
      <DateRange
      ranges={[value]}
      onChange={onChange}
      minDate={new Date()}
      disabledDates={disabledDates}
      {...props}
      />
    
  )
}

export default CalendarInput
