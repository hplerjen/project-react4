/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Box, Card,  CardContent, CardMedia, Typography } from "@mui/material";
import { useRootStore } from "../state/root-store";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { formatDateTime } from "../utility/date-utility";
import { convertFireStoreToStringFormattedEventType } from "../model/event";
import { concatImagePath } from "../utility/gui-helper";
import "./card.css";

export const EventR = observer(() => {
  
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

  const dateToSec = dateTo.getSeconds();
  const currentTimeSec = new Date().getSeconds();
  const future = dateToSec  >  currentTimeSec;

  return (
    <div
    style={{
    padding: "10px",
    textAlign: "start",
  }} >

  <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
    }}>     

    
    <Card className="card">
    <CardContent>
      <Typography className="cardTitel">
          { "Event Details"}
      </Typography>
      <Typography className="textField" >
          {title} 
      </Typography>
      <Typography className="textField" >
          {artist} 
      </Typography>
      <Typography className="textField" >
          {convertFireStoreToStringFormattedEventType(eventType)} 
      </Typography>
      <Typography className="textField" >
          {location} 
      </Typography>
      </CardContent>
      <CardContent>  
      <Typography>
          {formatDateTime(dateFrom)} 
      </Typography>
      <Typography>
          {formatDateTime(dateTo)}
      </Typography>
      </CardContent> 

      <CardMedia
              component="img"
              alt={imageAltText}
              height="140"
              image = {concatImagePath(image)}
            />

      <CardContent>
      <Typography className="textField" >
          {description} 
      </Typography> 
   
      <Typography className="textField" >
          {place} 
      </Typography>      
      <Typography className="textField" >
          {organisation} 
      </Typography>  
      </CardContent>     
      {future && 
        <CardContent>
                <a href={url} target="_blank" rel="noreferrer">
                    Event link (extern)
                </a>
        </CardContent> 
      }
  </Card>


</Box>
</div>
  );
}
)