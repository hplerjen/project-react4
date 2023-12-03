import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'

export const User =  observer(() => {

  const [pwd, setPassword] = useState("")
  const [email, setEmail] = useState("");
  
  const registerUser = (event: FormEvent) => {
    event.preventDefault();
    
  };

  return (
    
    <div
      style={{
        padding: "10px",
        textAlign: "start",
      }}
    >
      <Typography variant="h5">User Registration</Typography>
      <div className="cardContainer">
        
          <Card className="card">
            <CardContent>
              <Typography className="cardTitel">
                Dieser Account ist nicht mit einer E-Mail verbunden
              </Typography>
              <Typography>
                Listen können verloren gehen! Sie können ihren Account mit einem neuem Account verbinden oder sich mit einem bestehemden Account anmelden.
              </Typography>
              <form
                onSubmit={registerUser}
                style={{ display: "flex", flexDirection: "column", alignItems: "start"}}
              >
                <TextField variant="outlined" type="email" label="E-Mail" className="textField" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                <TextField variant="outlined" type="password" label="Passwort" className="textField" value={pwd} onChange={(e) => setPassword(e.target.value)} name="password" required/>
                <div style={{ paddingTop: "10px" }}>
                  <Button type="submit" value="create">
                    Create new account
                  </Button>
                  <Button type="submit" value="register">
                    Register
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