import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Button, Card, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export const EventUpdate = observer(() => {
    const store = useRootStore();
    const navigate = useNavigate();
    const param = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    /*async const readEvent(id : string){
      return await store.eventService.getDoc(param.id as string);
    }*/
    
    const readTitle = function (id : string = ""): string {
      console.log(id);
      const title = Object.values(store.eventStore.events).find((e) => e?.id === param?.id)?.title
      return title! 
    }

    const updateEvent = async (event: FormEvent) => {
        event.preventDefault();
        await store.eventService.update({title, description});
        navigate("/event");
    };
  
    return (
      <Card variant="outlined">
    <form
    onSubmit={updateEvent}
    style={{ display: "flex", flexDirection: "column", alignItems: "start"}}>
    <TextField 
    variant="outlined" type="title" label="Title" className="textField" value={title} 
    defaultValue={
      readTitle(param?.id)
    }
    onChange={(e) => setTitle(e.target.value)} name="title" required />
    <TextField variant="outlined" type="description" label="Description" 
    className="textField" value={description} 
    defaultValue={
      Object.values(store.eventStore.events).find((e) => e?.id === param?.id)?.description
    }
    onChange={(e) => setDescription(e.target.value)} name="description" required/>
    <div style={{ paddingTop: "10px" }}>
      <Button type="submit" value="updateEvent">
        Update Event 
      </Button>
    </div>
  </form>
  </Card>
  )
}
)
