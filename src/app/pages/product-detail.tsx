/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Button, Card,  CardContent, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useRootStore } from "../state/root-store";
import { useParams } from "react-router-dom";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import CheckIcon from "@mui/icons-material/Check";

export function ProductDetail() {
  
  const store = useRootStore();
  //const navigate = useNavigate();
  const productId = useParams().id;

  //const [title, setTitle] = useState(store!.productStore!.findById(id)!.title);
  //const [description, setDescription] = useState(store!.productStore!.findById(id)!.description);
  
  const [product] = useState(store.productStore.findById(productId));
  const [number, setNumber] = useState(1);
  
  const addToCart = async (event: FormEvent) => {
    event.preventDefault();
   // const onStock = store.productStore.onStock(productId);
  //  store.orderStore.addProductToCart({userId, product, number});
};
  
  return (
    <Card className="card">
    <CardContent>
      <Typography className="cardTitle">
      {product?.title} 
      </Typography>
      <Typography>
      {product?.description} 
      </Typography>
      <Typography>   
             // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-asserted-optional-chain
             {product?.stock!  > 0? (
                <CheckIcon /> 
            ) : (
              <CheckIcon />
        )}

      </Typography>
      <form
        onSubmit={addToCart}
        style={{ display: "flex", flexDirection: "column", alignItems: "start"}}
      >
      <NumberInput min={1} max={product?.stock} 
        aria-label="Demo number input"
        placeholder="Type a number…"
        value={number}
        onChange={(e, val) => setNumber(Number(val))}
      />
     
        <div style={{ paddingTop: "10px" }}>
          <Button type="submit" value="buy">
            Buy
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
  );
}