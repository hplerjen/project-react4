import { Badge, Button } from '@mui/material'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { observer } from 'mobx-react-lite';
//import { useRootStore } from '../state/root-store';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../state/root-store';


export const MiniCart = observer(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = useRootStore();
  const navigate = useNavigate();

const [numbersOfProducts]= useState(100);
  //store.orderStore.currentOrder?.numberOfProducts);
const [totalCostWithoutPostage]= useState(100);

const navigateCart= () => {
  navigate("/cart");
};


  return (
    <div style={{ display: "flex", alignItems: "center" }}>
            <Badge badgeContent={numbersOfProducts} color="primary">
            {totalCostWithoutPostage} 
            {totalCostWithoutPostage > 0 && 'CHF' }
            <Button data-testid="cart" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <ShoppingCartIcon /> }
                    onClick={navigateCart}>
              Shopping Cart
            </Button>
            </Badge>
      </div>
  )
}



)