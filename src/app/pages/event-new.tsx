import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';

//FIXME merge with Update
export const EventNew = observer(() => {
    const store = useRootStore();
    const navigate = useNavigate();
  
    //const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateFrom, setDateFrom] = useState(Timestamp.fromDate(new Date()));
    const [dateTo, setDateTo] = useState((Timestamp.fromDate(new Date('2023-12-25'))));

  

      const createEvent = (event: FormEvent) => {
        event.preventDefault();
        store.eventService.add({id : "", title, description, dateFrom, dateTo});
        navigate("/event");
      };
    

    return (
      <div
        style={{
        padding: "10px",
        textAlign: "start",
      }} >
      
      <Typography variant="h6">Event New</Typography>
      <div className="cardContainer">
        <Card className="card">
              <CardContent>
                <Typography className="cardTitel">
                  Add new Event
                </Typography>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "start", }}
            onSubmit={createEvent}>
    
            <TextField variant="outlined" type="title" label="Title" className="textField" value={title} onChange={(e) => setTitle(e.target.value)} name="title" required />
            <TextField variant="outlined" type="description" label="Description" className="textField" value={description} onChange={(e) => setDescription(e.target.value)} name="description" required/>
               

            

<DateTimePicker label="Date & Time from"
  value={dateFrom}
  onChange={(newValue) => newValue && setDateFrom(newValue)}
/>

    <DatePicker
        label="Date & Time to"
        value={dateTo}
        onChange={(newValue) => newValue && setDateTo(newValue)}
    />    
            
            <div style={{ paddingTop: "10px" }}>
              <Button type="submit" value="createEvent">
                Add Event to Eventlist
              </Button>
            </div>
      </form>
      </CardContent>
  </Card>
  </div>
  </div>

  )
}
)