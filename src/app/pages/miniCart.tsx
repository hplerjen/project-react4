import { Badge, Button } from '@mui/material'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { observer } from 'mobx-react-lite';
//import { useRootStore } from '../state/root-store';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../state/root-store';

//show number of items in cart (or products in total?)
//show sum of product costs

export const MiniCart = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();

const [numbersOfProducts]= useState(store.orderStore.currentOrder?.numberOfProducts);
const [totalCostWithoutPostage]= useState();

const navigateCart= () => {
  navigate("/cart");
};


  return (
    <div style={{ display: "flex", alignItems: "center" }}>
            <Badge badgeContent={numbersOfProducts} color="primary">
            {totalCostWithoutPostage}

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