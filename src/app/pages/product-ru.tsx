import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { observer } from 'mobx-react-lite';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

export const ProductUpdate = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();
  const id = useParams().id;

  const [title, setTitle] = useState(store.productStore.findById(id)!.title);
  const [description, setDescription] = useState(store.productStore.findById(id)!.description);
  const [stock, setStock] = useState(store.productStore.findById(id)!.stock);
  const [price, setPrice] = useState(store.productStore.findById(id)!.price);

  const updateProduct = async (event: FormEvent) => {
    event.preventDefault();
    await store.productService.update({ id, title, description, stock, price });
    navigate("/product");
  };

  return (
    <div
      style={{
        padding: "10px",
        textAlign: "start",
      }}
    >
      <Typography variant="h6">Product Update</Typography>
      <div className="cardContainer">
        <Card className="card">
          <Typography className="cardTitel">
            update Product
          </Typography>
          <CardContent>
            <form
              onSubmit={updateProduct}
              style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
              <TextField variant="outlined" type="title" label="Title" className="textField"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title" required />
              <TextField variant="outlined" type="description" label="Description" className="textField"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description" required />

              <NumberInput min={1} max={10}
                aria-label="Demo number input"
                placeholder="Type a number…"
                value={stock}
                onChange={(e, val) => setStock(Number(val))}
              />

              <NumberInput min={1}
                aria-label="Demo number input"
                placeholder="Type a number…"
                value={price}
                onChange={(e, val) => setPrice(Number(val))}
              />

              <TextField variant="outlined" type="description" label="Price" className="textField" value={stock} onChange={(e) => setPrice(Number(e.target.value))} name="price" required />

              <div style={{ paddingTop: "10px" }}>
                <Button type="submit" value="updateProduct">
                  Update Event
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
