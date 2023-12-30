import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import React  from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export const EventListList = observer(() => {
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
          <div style={{ overflow: "auto", flex: "1 1 100%" }}>
              <List>
                {Object.values(store.eventStore.events).map((eventM) => (
                        <ListItem
                            disablePadding
                            key={eventM.id}
                            className="event"
                          > 
                            <ListItemText primary={eventM.id} />
                            <ListItemText primary={eventM.title} />
                            <ListItemText primary={eventM.description} />


                            <ListItemButton>
                            <IconButton
                                onClick={(e) => updateEvent(e, eventM.id!)}>
                                <Editicon />
                            </IconButton>
                          </ListItemButton>
                      


                          <ListItemButton>
                          <IconButton
                                onClick={(e) => deleteConfirmDialog(e, eventM.id!)}>
                                <DeleteIcon />
                            </IconButton>
                          </ListItemButton>
                        </ListItem>
                      )
                )
                }
              </List>
      </div>
     

<Dialog
open={openDeleteDialog}
onClose={() => navigateBackAfterCancelEventDeletion()}
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

    <Button
      onClick={(e) => { deleteEvent(e, id);
      }}
    >
      Sure to delete this event?
    </Button>
    <Button onClick={() => navigateBackAfterCancelEventDeletion}>Cancel</Button>
  </div>
</DialogContent>
</Dialog>
</>
)
        })