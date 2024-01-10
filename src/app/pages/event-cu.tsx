import React, { FormEvent, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Box, Button, Card, CardContent, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DateTimePicker, DateValidationError } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { Severity } from '../model/message';
import { useRootStore } from '../state/root-store';
import { EventType, convertEventTypeFromFireStore } from '../model/event';

export const EventCRU = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();
  const id = useParams().id;

  const [title, setTitle] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.title : "");
  const [description, setDescription] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.description : "");
  const [artist, setArtist] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.artist : "");
  const [location, setLocation] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.location : "");
  const [place, setPlace] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.place : "");
  const [organisation, setOrganisation] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.organisation : "");

  const [url, setUrl] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.url : "");
  const [image, setImage] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.image : "");
  const [imageAltText, setImageAltText] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.imageAltText : "");

  const [eventType, setEventType] = useState(store.eventStore.findById(id) ? convertEventTypeFromFireStore(store.eventStore.findById(id)!.eventType) : EventType.workshop)

  const [dateFrom, setDateFrom] = useState(store.eventStore.findById(id) ? store.eventStore.findById(id)!.dateFrom : Timestamp.fromDate(tomorrow()));
  const [dateTo, setDateTo] = useState(store.eventStore.findById(id) ? store!.eventStore.findById(id)!.dateTo :
    Timestamp.fromDate(tomorrow()));

  const [createdAt,] = useState(store.eventStore.findById(id) ? store!.eventStore.findById(id)!.createdAt : Timestamp.now());

  const [dateError, setDateError] = useState<DateValidationError | null>(null);

  function tomorrow() {
    const today = new Date() // get today's date
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow
  }

  const createEvent = (event: FormEvent) => {
    event.preventDefault();
    if (dateFrom && dateTo && dateFrom > dateTo) {
      fireDateRangeValidationError()
    }
    else {
      store.eventService.add({ id: "", title, description, eventType, artist, location, place, organisation, url, image, imageAltText, dateFrom, dateTo, createdAt });
      navigate("/event");
    }
  };

  function fireDateRangeValidationError() {
    store.messageStore.setMessage({
      show: true,
      text: "Date To should be after Date From",
      severity: Severity.error,
    });
  }

  const updateEvent = async (event: FormEvent) => {
    event.preventDefault();
    if (dateFrom && dateTo && dateFrom > dateTo) {
      fireDateRangeValidationError()
    }
    else {
      await store.eventService.update(
        {
          id, title, description, eventType,
          artist, location, place, organisation, url, image, imageAltText, dateFrom, dateTo,
          createdAt
        });
      navigate("/event");
    }
  }


  const dateErrorMessage = React.useMemo(() => {
    switch (dateError) {

      case 'minDate': {
        return 'Please select a date in the future';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [dateError]);


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
              {id ? "Event Update" : "New Event"}
            </Typography>

            <form style={{ display: "flex", flexDirection: "column", alignItems: "start", }}
              onSubmit={id ? updateEvent : createEvent}>

              <TextField variant="outlined" type="text" label="Title" className="textField"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title" required />

              <TextField
                className="textField"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description" required
                multiline
                rows={4}
                helperText="Max. 50 signs"
              />

              <div style={{ paddingTop: "30px" }}>
                <InputLabel id="eventType">Event type</InputLabel>
                <Select
                  labelId="eventtype"
                  id="eventtype"
                  value={eventType}
                  label="Event Type"
                  onChange={(e) => setEventType(e.target.value as EventType)}
                >
                  <MenuItem value={EventType.workshop}>Workshop</MenuItem>
                  <MenuItem value={EventType.concert}>Concert</MenuItem>
                  <MenuItem value={EventType.presentation}>Presentation</MenuItem>
                </Select>
              </div>


              <div style={{ paddingTop: "30px" }}>
                <TextField variant="outlined" type="text"
                  label="Artist" className="textField"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  name="description" required
                />
              </div>
              <div style={{ paddingTop: "30px" }}>
                <TextField variant="outlined" type="text"
                  label="Location" className="textField"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  name="location" required
                  helperText="Building etc."
                />

                <TextField variant="outlined" type="text"
                  label="Place" className="textField"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  name="place" required
                  helperText="Village/ Town etc."
                />

                <TextField variant="outlined" type="text"
                  label="Organisation" className="textField"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  name="organsation" required
                  helperText="Organizer etc."
                />

                <TextField variant="outlined" type="text"
                  label="URL" className="textField"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  name="url" required
                  helperText="http://"
                />
              </div>
              <div style={{ paddingTop: "30px" }}>
                <TextField variant="outlined" type="text"
                  label="Image path" className="textField"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  name="image" required
                  helperText="event/*.jpg"
                />

                <TextField variant="outlined" type="text"
                  label="Image Alt-Text" className="textField"
                  value={imageAltText}
                  onChange={(e) => setImageAltText(e.target.value)}
                  name="imageAltText" required
                />
              </div>
              <div style={{ paddingTop: "30px" }}>
                <DateTimePicker
                  label="Date & Time from"
                  value={dayjs(dateFrom.toDate())}
                  onChange={(newValue) => newValue && setDateFrom(
                    Timestamp.fromDate(
                      dayjs(newValue).toDate()))}
                  //format="MM-DD-YYYY HH:MM"
                  views={['year', 'month', 'day', 'hours', 'minutes']}
                  orientation="landscape"
                  disablePast
                  /*minDate={dayjs()}*/
                  onError={(newError) => setDateError(newError as DateValidationError)}
                  slotProps={{
                    textField: {
                      helperText: dateErrorMessage,
                    },
                  }} />
              </div>
              <div style={{ paddingTop: "30px" }}>
                <DateTimePicker
                  label="Date & Time to"
                  value={dayjs(dateTo.toDate())}
                  onChange={(newValue) => newValue && setDateTo(
                    Timestamp.fromDate(
                      dayjs(newValue).toDate()))}
                  //format="MM-DD-YYYY HH:MM"
                  views={['year', 'month', 'day', 'hours', 'minutes']}
                  orientation="landscape"
                  disablePast
                  minDate={dayjs()}
                  onError={(newError) => setDateError(newError as DateValidationError)}
                  slotProps={{
                    textField: {
                      helperText: dateErrorMessage,
                    },
                  }} />
              </div>
              <div style={{ paddingTop: "10px" }}>
                <Button type="submit" value={id ? "updateEvent" : "createEvent"} >
                  {id ? 'Update Event to Eventlist' : 'Create new event'}
                </Button>
              </div>
            </form>

          </CardContent>
        </Card>
      </Box>
    </div>

  )
}
)


