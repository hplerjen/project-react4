/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Card,  CardContent, Typography } from "@mui/material";
import { useRootStore } from "../state/root-store";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";

export const EventDetail = observer(() => {
  
  const store = useRootStore();
  const id = useParams().id;

  const [title] = useState(store.eventStore.findById(id)!.title);
  const [description] = useState(store.eventStore.findById(id)!.description);
   
  return (
    <Card className="card">
    <CardContent>
      <Typography className="cardTitle">
      {title} 
      </Typography>
      <Typography>
      {description} 
      </Typography>
      
    
    </CardContent>
  </Card>
  );
}        )