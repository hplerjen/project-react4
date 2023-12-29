import { Typography } from '@mui/material'
import React from 'react'
import { UserLogInRegister } from './user-log-in-register'
import { Address } from './address'
import { ProductListCart } from './product-list_cart'

//FIXME observable
//user, password
//address --page flow 
//product list
//checkbox

const Cart = () => {
  return (

    <div
      style={{
        padding: "10px",
        textAlign: "start",
      }}
    >
    <Typography variant="h6">Welcome to ShoppingCart</Typography>
    <div className="cardContainer">
       <UserLogInRegister />
       <Address />
       <ProductListCart/>


    </div>
    </div>
  )
}

export default Cart