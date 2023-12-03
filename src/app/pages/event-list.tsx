import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EventList = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();


  const deleteEvent = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    store.eventService.remove(id);
    navigate("/event");
  };

  const readEvent = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/event-update/${id}`);  
  };

  return (
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
                                onClick={(e) => readEvent(e, eventM.id!)}>
                                <Editicon />
                            </IconButton>
                          </ListItemButton>
                      


                          <ListItemButton>
                            <IconButton
                                onClick={(e) => deleteEvent(e, eventM.id!)}>
                                <DeleteIcon />
                            </IconButton>
                          </ListItemButton>
                        </ListItem>
                      )
                )
                }
              </List>
      </div>
  );
}
)