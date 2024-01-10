import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { formatDateTime } from "../utility/date-utility";
import { convertFireStoreToStringFormattedEventType } from "../model/event";
import { concatImagePath } from "../utility/gui-helper";

export interface Props {
  future: boolean
}

export const EventList = observer(({ future }: Props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [id, setId] = React.useState("");
  const store = useRootStore();
  const navigate = useNavigate();

  const eventList = future ? store.eventStore.futureEvents() : store.eventStore.pastEvents();


  const viewEventDetail = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/event/${id}`);
  };

  const deleteConfirmDialog = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setId(id);
    setOpenDeleteDialog(true);
  };

  const navigateBackAfterCancelEventDeletion = () => {
    setOpenDeleteDialog(false);
    navigate("/event");
  };

  const deleteEvent = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setOpenDeleteDialog(false);
    store.eventService.remove(id);
    navigate("/event");
    //FIXME valid implementation on same page flow?
    window.location.reload();
  };

  const updateEvent = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/event-update/${id}`);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          width: {
            xs: 100,
            sm: 200, 
            md: 300, 
            lg: 400, 
            xl: 500
          }, 
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
          {Object.values(eventList).map((eventM) => (

            <Card key={eventM.id} className="card" sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography className="cardTitle">
                  {eventM.title}
                </Typography>
                <Typography className="textField" >
                  {eventM.artist}
                </Typography>

                <Typography className="textField" >
                  {convertFireStoreToStringFormattedEventType(eventM.eventType)}
                </Typography>
                <Typography className="textField" >
                  {eventM.place}
                </Typography>
              </CardContent>

              <CardMedia
                component="img"
                alt={eventM.imageAltText}
                height="140"
                image={concatImagePath(eventM.image)}
              />

              <CardContent>
                <Typography className="textField" >
                  {formatDateTime(eventM.dateFrom.toDate())}
                </Typography>
                <Typography className="textField" >
                  {formatDateTime(eventM.dateTo.toDate())}
                </Typography>
              </CardContent>

              {future &&
                <CardContent>
                  <a href={eventM.url} target="_blank" rel="noreferrer">
                    Event link (extern)
                  </a>
                </CardContent>
              }

              <CardActions>
                <IconButton onClick={(e) => viewEventDetail(e, eventM.id!)}>
                  <VisibilityIcon />
                </IconButton>

                <IconButton onClick={(e) => updateEvent(e, eventM.id!)}>
                  admin
                  <Editicon />
                </IconButton>

                <IconButton onClick={(e) => deleteConfirmDialog(e, eventM.id!)}>
                  admin
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          )
          )
          }
        </Box>
      </div>

      <Dialog
        open={openDeleteDialog}
        onClose={(e) => navigateBackAfterCancelEventDeletion()}
      >
        <DialogTitle>Delete event</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography className="cardTitle">
              sure to delete this event?
            </Typography>

            <Button aria-label="Delete"
              onClick={(e) => { deleteEvent(e, id); }}>
              Delete
            </Button>
            <Button onClick={(e) => navigateBackAfterCancelEventDeletion()}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
})