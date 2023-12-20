import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import "./card.css";

export const ProductNew = observer(() => {
    const store = useRootStore();
    const navigate = useNavigate();
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(1);

      const createProduct = (event: FormEvent) => {
        event.preventDefault();
        store.productService.add({id : "", title, description, stock});
        navigate("/product");
      };
    

    return (
      <div
      style={{
        padding: "10px",
        textAlign: "start",
      }}
    >
      <Typography variant="h6">Product New</Typography>
      <div className="cardContainer">
        <Card className="card">
          <Typography className="cardTitel">
                    add new Product 
                  </Typography>
        <CardContent>
          <form onSubmit={createProduct}>
          <TextField variant="outlined" type="title" label="Title" className="textField" value={title} onChange={(e) => setTitle(e.target.value)} name="title" required />
          <TextField variant="outlined" type="description" label="Description" className="textField" value={description} onChange={(e) => setDescription(e.target.value)} name="description" required/>
          <TextField variant="outlined" type="description" label="Stock" className="textField" value={stock} onChange={(e) => setStock(Number(e.target.value))} name="stock" required/>
          
          <NumberInput  min={1} max={10} 
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={stock}
            onChange={(e, val) => setStock(Number(val))}
          />
        
        <div style={{ paddingTop: "10px" }}>
          <Button type="submit" value="createProduct">
            Add new Product to Productlist
          </Button>
        </div>
      </form>
    </CardContent>
    </Card>
  </div>
  </div>
  );
}
)