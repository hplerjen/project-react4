/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import "./card.css";
import { useRootStore } from '../state/root-store';

export const Postage =  observer(() => {
  const store = useRootStore();
  
  const [postage, setPostage] = useState("post-b")

  function savePostage(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
    //savePostageToOrder
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, value: string): void {
     setPostage(value);
  }

  return (
    <div
    style={{
      padding: "10px",
      textAlign: "start",
    }}
  >
    <Typography variant="h6">Postage details</Typography>
      <div className="cardContainer">
          <Card className="card">
            <CardContent>
              <Typography className="cardTitel">
                Bill address
              </Typography>
              <form
                onSubmit={savePostage}
                style={{ display: "flex", flexDirection: "column", alignItems: "start"}}
              >
<FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={postage}
    onChange={handleChange}
  >
    <FormControlLabel value="post-a" control={<Radio />} label="Post-A" />
    <FormControlLabel value="post-b" control={<Radio />} label="Post-B" />
  </RadioGroup>
</FormControl>
                <div style={{ paddingTop: "10px" }}>
                  <Button type="submit" value="address">
                    Save Postage
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