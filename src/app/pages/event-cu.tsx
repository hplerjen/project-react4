import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Box, Button, Card, CardContent, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DateTimePicker, DateValidationError } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { Severity } from '../model/message';

export const EventUpdate = observer(() => {
    const store = useRootStore();
    const navigate = useNavigate();
    const id = useParams().id;
    
    const [title, setTitle] = useState(store.eventStore.findById(id)? store.eventStore.findById(id)!.title : "");
    const [description, setDescription] = useState(store.eventStore.findById(id)?store.eventStore.findById(id)!.description : "");
    const [dateFrom, setDateFrom] = useState(store.eventStore.findById(id)?store.eventStore.findById(id)!.dateFrom : Timestamp.fromDate(tomorrow()));
    const [dateTo, setDateTo] = useState(store.eventStore.findById(id)?store!.eventStore.findById(id)!.dateTo : 
    Timestamp.fromDate(tomorrow()));

    const [dateError, setDateError] =  useState<DateValidationError | null>(null);

    function  tomorrow() {
      const today = new Date() // get today's date
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      return tomorrow}


    const createEvent = (event: FormEvent) => {
      event.preventDefault();
      if (dateFrom && dateTo && dateFrom > dateTo) { 
        fireDateRangeValidtionError() }
      else {
        store.eventService.add({id : "", title, description, dateFrom, dateTo});
        navigate("/event");
      }
    };

    function fireDateRangeValidtionError(){
      store.messageStore.setMessage({
        show: true,
        text: "Date To should be after Date From",
        severity: Severity.error,
      }); 
    }

    const updateEvent = async (event: FormEvent) => {
        event.preventDefault();
        if (dateFrom && dateTo && dateFrom > dateTo) 
        { fireDateRangeValidtionError() } else {
        await store.eventService.update({id, title, description, dateFrom, dateTo});
        navigate("/event");
        }
      }


    const dateErrorMessage = React.useMemo(() => {
      switch (dateError) {
        
        case 'minDate': {
          return 'Please select a date in the future';
        }
  
        case 'invalidDate': {
          return 'Your date is not valid';
        }
  
        default: {
          return '';
        }
      }
    }, [dateError]);
  

    return (
      <div
        style={{
        padding: "10px",
        textAlign: "start",
      }} >


    
<Box sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
        }}>     
        <Card className="card">
              <CardContent>
                <Typography className="cardTitel">
                { id? "Event Update" : "New Event"}
                </Typography>
        
        <form style={{ display: "flex", flexDirection: "column", alignItems: "start", }}
            onSubmit={id? updateEvent : createEvent}>
    
          <TextField variant="outlined" type="title" label="Title" className="textField" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              name="title" required />
    
          <TextField variant="outlined" type="description" 
              label="Description" className="textField" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              name="description" required 
          />

{/*<InputLabel id="eventtype">Age</InputLabel>
  <Select
    labelId="eventtype"
    id="eventtype"
    value={eventType}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Concert</MenuItem>
    <MenuItem value={20}>Workshop</MenuItem>
    <MenuItem value={30}>Presentation</MenuItem>
  </Select> */}
  
          <div style={{ paddingTop: "20px" }}>
              <DateTimePicker 
                  label="Date & Time from"
                  value={dayjs(dateFrom.toDate())}
                  onChange={(newValue) => newValue && setDateFrom(
                    Timestamp.fromDate(
                    dayjs(newValue).toDate()))}
                  //format="MM-DD-YYYY HH:MM"
                  views={['year', 'month', 'day', 'hours', 'minutes']}
                  orientation="landscape"
                  disablePast
                  /*minDate={dayjs()}*/
                  onError={(newError) => setDateError(newError as DateValidationError)}
                  slotProps={{
                    textField: {
                      helperText: dateErrorMessage,
                    },
                  }}   /> 
              </div>
              <div style={{ paddingTop: "20px" }}>
                <DateTimePicker
                    label="Date & Time to"
                    value={dayjs(dateTo.toDate())}
                    onChange={(newValue) => newValue && setDateTo(
                      Timestamp.fromDate(
                      dayjs(newValue).toDate()))}
                    //format="MM-DD-YYYY HH:MM"
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                    orientation="landscape"
                    disablePast
                    minDate={dayjs()}
                    onError={(newError) => setDateError(newError as DateValidationError)}
                    slotProps={{
                      textField: {
                        helperText: dateErrorMessage,
                      },
                    }}   />  
                    </div>         
              <div style={{ paddingTop: "10px" }}>
                  <Button type="submit"  value={ id? "updateEvent":"createEvent"} > 
                  { id? 'Update Event to Eventlist':'Create new event'}
                  </Button>
            </div>
      </form>

      </CardContent>
  </Card>
  </Box>
  </div>

  )
}
)


