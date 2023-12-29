import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

export const EventListTable = observer(() => {
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
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Delete with Dialog</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.values(store.eventStore.events).map((eventM) => (
            <TableRow
              key={eventM.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell align="right">{eventM.id}</TableCell>
            <TableCell align="right">{eventM.title}</TableCell>
            <TableCell align="right">{eventM.description}</TableCell>
            <TableCell align="right">
                            <IconButton
                                onClick={(e) => viewEventDetail(e, eventM.id!)}>
                                <VisibilityIcon />
                            </IconButton>
            </TableCell>
            <TableCell align="right">
                            <IconButton
                                onClick={(e) => updateEvent(e, eventM.id!)}>
                                <Editicon />
                            </IconButton>
            </TableCell>
            <TableCell align="right">
                            <IconButton
                                onClick={(e) => deleteEvent(e, eventM.id!)}>
                                <DeleteIcon />
                            </IconButton>
            </TableCell>
            <TableCell align="right">
                            <IconButton
                                onClick={(e) => deleteConfirmDialog(e, eventM.id!)}>
                                <DeleteIcon />
                            </IconButton>
            </TableCell>
            </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>

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