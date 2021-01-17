
// /* eslint-disable no-underscore-dangle */
// import React, { Component } from 'react'
// import TextField from "@material-ui/core/TextField";
// import { MobileDatePicker, DesktopDatePicker, DatePicker } from "@material-ui/pickers";

// export class DatePickersVariants extends Component {
//     // (demoProps: any)

//     state = {
//         value: new Date()
//     }

//     setValue = (ev) => {
//         console.log('event...', ev);
//         this.setState({ value:ev })
//     }
// //   const [value, setValue] = React.useState<Date | null>(new Date());

// render() {
//     const { value } = this.state
//     return (
//       <React.Fragment>
//         {/* <MobileDatePicker
//           clearable
//           label="For mobile"
//           inputFormat={demoProps.__willBeReplacedGetFormatString({
//             moment: "MM/DD/YYYY",
//             dateFns: "MM/dd/yyyy",
//           })}
//           toolbarPlaceholder="Enter Date"
//           value={value}
//           onChange={(newValue) => this.setValue(newValue)}
//           renderInput={(props) => <TextField {...props} />}
//         /> */}
//         {/* <DesktopDatePicker
//           label="For desktop"
//           value={value}
//           minDate={new Date("2017-01-01")}
//           onChange={(newValue) => this.setValue(newValue)}
//           renderInput={(props) => <TextField {...props} />}
//         /> */}
//         <DatePicker
//           disableFuture
//           label="Responsive"
//           openTo="year"
//           views={["year", "month", "date"]}
//           value={value}
//           onChange={(newValue) => this.setValue(newValue)}
//           renderInput={(props) => <TextField {...props} />}
//         />
//       </React.Fragment>
//     );

// }
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
