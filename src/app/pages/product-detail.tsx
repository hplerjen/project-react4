import { Button, Card,  CardContent, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useRootStore } from "../state/root-store";
import { useParams } from "react-router-dom";

export function ProductDetail() {
  
  const store = useRootStore();
  //const navigate = useNavigate();
  const id = useParams().id;

  //const [title, setTitle] = useState(store!.eventStore!.findById(id)!.title);
  //const [description, setDescription] = useState(store!.eventStore!.findById(id)!.description);
  
  const [product, setProduct] = useState(store!.productStore!.findById(id));
  
  const addToCart = async (event: FormEvent) => {
    event.preventDefault();
    //store.cartStore.add(new ProductMini(), 2);
};
  
  return (
    <Card className="card">
    <CardContent>
      <Typography className="cardTitle">
        Card Titel
      </Typography>
      <Typography>
        Card Description
      </Typography>
      <form
        onSubmit={addToCart}
        style={{ display: "flex", flexDirection: "column", alignItems: "start"}}
      >
        <TextField variant="outlined" 
        type="title" 
        label="Title" 
        className="textField" 
        value={product?.title} 
        onChange={(e) => setProduct( {  title: e.target.value, description: product!.description})} 
        name="title" required />
        <TextField variant="outlined" type="description" label="Description" className="textField" 
        value={product?.description} 
        onChange={(e) => setProduct({title: product!.title, description: e.target.value, })} 
        name="description" required/>
        
        <div style={{ paddingTop: "10px" }}>
          <Button type="submit" value="update">
            update Product
          </Button>
          <Button type="submit" value="buy">
            Buy
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
  );
}