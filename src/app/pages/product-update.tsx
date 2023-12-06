import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Button, Card, Paper, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export const ProductUpdate = observer(() => {
    const store = useRootStore();
    const navigate = useNavigate();
    const id = useParams().id;

    const [title, setTitle] = useState(store!.productStore!.findById(id)!.title);
    const [description, setDescription] = useState(store!.productStore!.findById(id)!.description);
    
    const updateProduct = async (event: FormEvent) => {
        event.preventDefault();
        await store.eventService.update({id, title, description});
        navigate("/event");
    };

    return (
      <Paper elevation={3}>
      <Card variant="outlined">
    <form
    onSubmit={updateProduct}
    style={{ display: "flex", flexDirection: "column", alignItems: "start"}}>
    <TextField 
    variant="outlined" type="title" label="Title" className="textField" value={title} 
    onChange={(e) => setTitle(e.target.value)} 
    name="title" required />
    <TextField variant="outlined" type="description" label="Description" 
    className="textField" 
    value={description} 
    onChange={(e) => setDescription(e.target.value)} 
    name="description" required />
    
    <div style={{ paddingTop: "10px" }}>
      <Button type="submit" value="updateProduct">
        Update Event 
      </Button>
    </div>
  </form>
  </Card>
  </Paper>
  )
}
)
