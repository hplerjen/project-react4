import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

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