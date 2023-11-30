import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { List, ListItem, ListItemButton } from "@mui/material";

export const EventList2 = observer(() => {
  const store = useRootStore();


  const deleteItem = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    store.eventService.remove(id);
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
                          <ListItemButton>
                            <IconButton
                                onClick={(e) => deleteItem(e, eventM.id!)}>
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