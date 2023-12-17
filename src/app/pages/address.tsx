/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'
import "./card.css";
import { useRootStore } from '../state/root-store';

export const Address =  observer(() => {
  const store = useRootStore();
  
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("");
  const [plz, setPlz] = useState("");
  const [location, setLocation] = useState("");
  
  function saveAddress(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div
    style={{
      padding: "10px",
      textAlign: "start",
    }}
  >
    <Typography variant="h6">Bill details</Typography>
      <div className="cardContainer">
          <Card className="card">
            <CardContent>
              <Typography className="cardTitel">
                Bill address
              </Typography>
              <form
                onSubmit={saveAddress}
                style={{ display: "flex", flexDirection: "column", alignItems: "start"}}
              >
                <TextField variant="outlined" type="firstName" label="First Name" className="textField" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" required />
                <TextField variant="outlined" type="firstName" label="First Name" className="textField" value={firstName} onChange={(e) => setSecondName(e.target.value)} name="secondName" required />
                <TextField variant="outlined" type="plz" label="Plz" className="textField" value={plz} onChange={(e) => setPlz(e.target.value)} name="plz" required/>
                <TextField variant="outlined" type="location" label="Location" className="textField" value={location} onChange={(e) => setLocation(e.target.value)} name="location" required/>
                <div style={{ paddingTop: "10px" }}>
                  <Button type="submit" value="address">
                    Save Address
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          </div>
          </div>
  )
}
)