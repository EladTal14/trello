// import React, { Component } from 'react'
// import { format } from 'date-fns'
// import { enGB } from 'date-fns/locale'
// import { DatePickerCalendar } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'


// export class DatePicker extends Component{

//     state ={
//         date: '',
//     }

//     setDate = (newDate) => {
//         this.setState({ date: newDate }, () => console.log('DATE', this.state.date))
        
//         console.log('engb', enGB);
//     }

//   render() {
//       const { date } = this.state
//       return (
//         <div>
//           <p>
//             Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
//           </p>
//           <DatePickerCalendar date={date} onDateChange={this.setDate} locale={enGB} />
//         </div>
//       )
//   }
// }





//------------------------------- material ui ------------------------------------///
// import 'date-fns';
// import React, { Component } from 'react'
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

// export class DatePicker extends Component{
//   // The first commit of Material-UI

//   state = {
//     selectedDate: new Date('2014-08-18T21:11:54')
//   }

//   handleDateChange = (date) => {
//     console.log('check111', date);
//     // this.setState({selectedDate: date}, () => console.log('date', this.state.selectedDate))

//   }
  
//   render(){
//       const { selectedDate } = this.state
//       return (
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <KeyboardDatePicker
//               margin="normal"
//               id="date-picker-dialog"
//               label="Date picker dialog"
//               format="MM/dd/yyyy"
//               name="selectedDate"
//               value={selectedDate}
//               onChange={this.handleDateChange}
//               KeyboardButtonProps={{
//                 'aria-label': 'change date',
//               }}
//             />
//         </MuiPickersUtilsProvider>
//       )

//   }
// }



// import 'date-fns';
// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

// export function DatePicker() {
//   // The first commit of Material-UI
//   const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     console.log('data', date);
//   };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container justify="space-around">
//         <KeyboardDatePicker
//           margin="normal"
//           id="date-picker-dialog"
//           label="Date picker dialog"
//           format="MM/dd/yyyy"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }
