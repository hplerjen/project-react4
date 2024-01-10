import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

//FIXEME Kasse: Login, Customer Address, Cart Content inl. total with change numbers, remove product , postage, total value,
//checkbox  geschäftsbedingungen
const Checkout = () => {
  return (
    <div>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel required control={<Checkbox />} label="Required" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
      </FormGroup>
    </div>
  )
}

export default Checkout