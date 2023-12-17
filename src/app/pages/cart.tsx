import { Typography } from '@mui/material'
import React from 'react'
import { UserLogginRegister } from './user_loggin_register'
import { Address } from './address'

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
       <UserLogginRegister />
       <Address />


    </div>
    </div>
  )
}

export default Cart