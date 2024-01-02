/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Card,  CardContent, Typography } from "@mui/material";
import { useRootStore } from "../state/root-store";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { formatDateTime } from "../utility/date-utility";

export const EventDetail = observer(() => {
  
  const mainStore = useRootStore();
  const id = useParams().id;

  const [title] = useState(mainStore.eventStore.findById(id)!.title);
  const [description] = useState(mainStore.eventStore.findById(id)!.description);
  const [dateFrom] = useState(mainStore.eventStore.findById(id)!.dateFrom.toDate());
  const [dateTo] = useState(mainStore.eventStore.findById(id)!.dateTo.toDate());

  return (
    <div
      style={{
      padding: "10px",
      textAlign: "start",
    }} >

    <div className="cardContainer">
    <Card className="card">
    <CardContent>
      <Typography className="cardTitel">
          Event details
      </Typography>
      <Typography className="textField" >
          {title} 
      </Typography>
      <Typography>
          {description} 
      </Typography>
      <Typography>
          {formatDateTime(dateFrom)} 
      </Typography>
      <Typography>
          {formatDateTime(dateTo)}
      </Typography>
   
    </CardContent>
  </Card>
  </div>
  </div>
  );
}
)