import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import React  from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Link, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { formatDateTime } from "../utility/date-utility";

export const EventListBoxCard = observer(() => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [id, setId] = React.useState("");
  const store = useRootStore();
  const navigate = useNavigate();


  const viewEventDetail = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/event/${id}`);  
  };

  const deleteConfirmDialog = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setId(id);
    setOpenDeleteDialog (true);
  };

  const navigateBackAfterCancelEventDeletion = () => {
    setOpenDeleteDialog (false);
    navigate("/event");
  };

  const deleteEvent = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setOpenDeleteDialog (false);
    store.eventService.remove(id);
    navigate("/event");
    //FIXME valid implementation on same page flow?
    window.location.reload();
  };

  const updateEvent = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/event-update/${id}`); 
  };

  /* useEffect(() => {
    store.eventService.getDocs()
  }, [store.eventService]);*/

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
        }}>
          {Object.values(store.eventStore.futureEvents()).map((eventM) => (
            <Card className="card" sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography className="cardTitle">
                  {eventM.title} 
                </Typography>
              <Typography>
                  {eventM.description} 
              </Typography>
              <Typography>
                  {formatDateTime(eventM.dateFrom.toDate())} 
              </Typography>
              <Typography>
                  {formatDateTime(eventM.dateTo.toDate())}
            </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="../assets/images/event/aillos.jpg"
            />
            <CardContent>
              <Link href="{{http//joik.ch}}" underline="always" target="_blank" rel="noreferrer">
                Event URL
              </Link>
            </CardContent>
            <CardActions>
              <IconButton onClick={(e) => viewEventDetail(e, eventM.id!)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={(e) => updateEvent(e, eventM.id!)}>
                <Editicon />
              </IconButton>
              <IconButton onClick={(e) => deleteConfirmDialog(e, eventM.id!)}>
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
      onClick={(e) => { deleteEvent(e, id);}}>
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