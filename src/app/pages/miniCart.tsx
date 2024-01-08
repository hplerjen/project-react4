import { Badge, Button } from '@mui/material'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { observer } from 'mobx-react-lite';
//import { useRootStore } from '../state/root-store';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../state/root-store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  numberOfProducts: number
  totalCostWithoutPosage: number
}

export const MiniCart = observer(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = useRootStore();
  const navigate = useNavigate();

const [numbersOfProducts]= useState(store.orderStore.currentOrder?store.orderStore.currentOrder.numberOfProducts: 0);
const [totalCostWithoutPostage]= useState(store.orderStore.currentOrder?store.orderStore.currentOrder.costTotalWithoutPostage: 0);

const navigateCart= () => {
  navigate("/cart");
};


  return (
    <div style={{ display: "flex", alignItems: "center" }}>
            <Badge badgeContent={numbersOfProducts} color="primary">
            {totalCostWithoutPostage} 
            {totalCostWithoutPostage && totalCostWithoutPostage > 0 && 'CHF' }
            <Button data-testid="cart" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <ShoppingCartIcon /> }
                    onClick={navigateCart}>
            </Button>
            </Badge>
      </div>
  )
}



)