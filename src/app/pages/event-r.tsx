/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Card,  CardContent, Typography } from "@mui/material";
import { useRootStore } from "../store/root-store";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { formatDateTime } from "../utility/date-utility";
import { convertFireStoreToStringFormattedEventType } from "../model/event";

export const EventDetail = observer(() => {
  
  const store = useRootStore();
  const id = useParams().id;

  const [title] = useState(store.eventStore.findById(id)!.title);
  const [description] = useState(store.eventStore.findById(id)!.description);
  const [eventType] = useState(store.eventStore.findById(id)!.eventType);
  
  const [artist] = useState(store.eventStore.findById(id)!.artist);
  const [location] = useState(store.eventStore.findById(id)!.location);
  const [place] = useState(store.eventStore.findById(id)!.place);
  const [organisation] = useState(store.eventStore.findById(id)!.organisation);
  const [url] = useState(store.eventStore.findById(id)!.url);
  const [image] = useState(store.eventStore.findById(id)!.image);
  const [imageAltText] = useState(store.eventStore.findById(id)!.imageAltText);
 
  const [dateFrom] = useState(store.eventStore.findById(id)!.dateFrom.toDate());
  const [dateTo] = useState(store.eventStore.findById(id)!.dateTo.toDate());

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
      <Typography className="textField" >
          {description} 
      </Typography>
      <Typography className="textField" >
          {artist} 
      </Typography>
      <Typography className="textField" >
          {location} 
      </Typography>      
      <Typography className="textField" >
          {place} 
      </Typography>      
      <Typography className="textField" >
          {organisation} 
      </Typography>      



      <Typography>
          {formatDateTime(dateFrom)} 
      </Typography>
      <Typography>
          {formatDateTime(dateTo)}
      </Typography>
   
      <Typography className="textField" >
                  {convertFireStoreToStringFormattedEventType(eventType)} 
              </Typography>
    </CardContent>
  </Card>
  </div>
  </div>
  );
}
)