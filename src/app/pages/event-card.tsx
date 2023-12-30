/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Card,  CardContent, Typography } from "@mui/material";
import { useRootStore } from "../state/root-store";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
//import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export const EventDetail = observer(() => {
  
  const mainStore = useRootStore();
  const id = useParams().id;

  const [title] = useState(mainStore.eventStore.findById(id)!.title);
  const [description] = useState(mainStore.eventStore.findById(id)!.description);
  const [dateFrom] = useState(mainStore.eventStore.findById(id)!.dateFrom);
  const [dateTo] = useState(mainStore.eventStore.findById(id)!.dateTo);




  return (
    <div
    style={{
      padding: "10px",
      textAlign: "start",
    }}
  >
    <Typography variant="h6">Event Details</Typography>
    <div className="cardContainer">
    <Card className="card">
    <CardContent>
      <Typography className="cardTitle">
      {title} 
      </Typography>
      <Typography>
      {description} 
      </Typography>
      

      <DatePicker
        label="Date & Time from"
        value={dateFrom}
      />

    <DatePicker
        label="Date & Time to"
        value={dateTo}
    />   
  

   {/*onChange={(newValue) => setDateFrom(newValue)}*/} 
    </CardContent>
  </Card>
  </div>
  </div>
  );
}
)