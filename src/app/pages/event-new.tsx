import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Button, Card, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const EventNew = observer(() => {
    const store = useRootStore();
    const navigate = useNavigate();
  
    //const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

      const createEvent = (event: FormEvent) => {
        event.preventDefault();
        store.eventService.add({title, description});
        navigate("/event");
      };
    

    return (
      <Card variant="outlined">
    <form
    onSubmit={createEvent}
    style={{ display: "flex", flexDirection: "column", alignItems: "start"}}>
    <TextField variant="outlined" type="title" label="Title" className="textField" value={title} onChange={(e) => setTitle(e.target.value)} name="title" required />
    <TextField variant="outlined" type="description" label="Description" className="textField" value={description} onChange={(e) => setDescription(e.target.value)} name="description" required/>
    <div style={{ paddingTop: "10px" }}>
      <Button type="submit" value="createEvent">
        Add Event to Eventlist
      </Button>
    </div>
  </form>
  </Card>
  )
}
)