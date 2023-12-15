import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'
import "./user.css";
import { useRootStore } from '../state/root-store';

export const User =  observer(() => {
  const store = useRootStore();
  const [pwd, setPwd] = useState("")
  const [email, setEmail] = useState("");
  
//FIXME from Michael
  const registerUser = (event: FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((event.nativeEvent as any).submitter.value === "register") {
      store.authService.connectUser({ email, pwd });
    } else {
      store.authService.login({ email, pwd });
    }
  };

  return (
    
    <div
      style={{
        padding: "10px",
        textAlign: "start",
      }}
    >
      <Typography variant="h6">User Registration</Typography>
      <div className="cardContainer">
        
          <Card className="card">
            <CardContent>
              <Typography className="cardTitel">
                Please register
              </Typography>
              <form
                onSubmit={registerUser}
                style={{ display: "flex", flexDirection: "column", alignItems: "start"}}
              >
                <TextField variant="outlined" type="email" label="E-Mail" className="textField" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                <TextField variant="outlined" type="password" label="Passwort" className="textField" value={pwd} onChange={(e) => setPwd(e.target.value)} name="password" required/>
                <div style={{ paddingTop: "10px" }}>
                  <Button type="submit" value="register">
                    Create new account
                  </Button>
                  <Button type="submit" value="login">
                    Login with existing credentials
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