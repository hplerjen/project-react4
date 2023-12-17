import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Button, Card, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ProductNew = observer(() => {
    const store = useRootStore();
    const navigate = useNavigate();
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

      const createProduct = (event: FormEvent) => {
        event.preventDefault();
        store.productService.add({title, description});
        navigate("/product");
      };
    

    return (
      <Card variant="outlined">
    <form
    onSubmit={createProduct}
    style={{ display: "flex", flexDirection: "column", alignItems: "start"}}>
    {/*<TextField variant="outlined" type="id" label="Id" className="textField" value={id} onChange={(e) => setId(e.target.value)} name="title" required />*/}
    <TextField variant="outlined" type="title" label="Title" className="textField" value={title} onChange={(e) => setTitle(e.target.value)} name="title" required />
    <TextField variant="outlined" type="description" label="Description" className="textField" value={description} onChange={(e) => setDescription(e.target.value)} name="description" required/>
    <div style={{ paddingTop: "10px" }}>
      <Button type="submit" value="createProduct">
        Add new Product to Productlist
      </Button>
    </div>
  </form>
  </Card>
  )
}
)