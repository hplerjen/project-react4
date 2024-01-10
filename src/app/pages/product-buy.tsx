/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Button, Card, CardContent, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useRootStore } from "../state/root-store";
import { useParams } from "react-router-dom";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import CheckIcon from "@mui/icons-material/Check";
import { observer } from "mobx-react-lite";
import CancelIcon from '@mui/icons-material/Cancel';
import { Severity } from "../model/message";

export const ProductDetail = observer(() => {

  const store = useRootStore();
  const productId = useParams().id;

  const [product] = useState(store.productStore.findById(productId));
  const [number, setNumber] = useState(1);

  const addToCart = async (event: FormEvent) => {
    event.preventDefault();
    //tbd: is product already in cart? Dialog
    if (product?.stock! > 0) {
      store.orderStore.addProductToCart(productId!, number);
    } else {
      store.messageStore.setMessage({
        show: true,
        text: "Product is out of stock",
        severity: Severity.warning
      });
    }

  };


  return (
    <div
      style={{
        padding: "10px",
        textAlign: "start",
      }}
    >
      <Typography variant="h6">Product details</Typography>
      <div className="cardContainer">
        <form
          onSubmit={addToCart}
          style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
        >
          <Card className="card">
            <Typography className="cardTitel">
              view Product details & buy
            </Typography>
            <CardContent>
              <Typography className="cardTitle">Product title: {product?.title} </Typography>
              <Typography>Product description:  {product?.description} </Typography>
              <Typography>stock:  {product?.stock} {product?.stock! > 0 ? (<CheckIcon />) : (<CancelIcon />)}</Typography>
              <Typography>price CHF:  {product?.price} </Typography>


              <NumberInput
                aria-label="Demo number input"
                placeholder="Type a number…"
                value={number}
                onChange={(e, val) => setNumber(Number(val))}
                error
              />

              {/*}
         <CustomNumberInput min={1} max={product?.stock} 
                 aria-label="Buy product"
                 placeholder="Type a number…"
         value={number}
         onChange={(e, val) => setNumber(Number(val))}
  />*/}

              <div style={{ paddingTop: "10px" }}>
                <Button type="submit" value="buy">
                  Buy
                </Button>
              </div>

            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
})