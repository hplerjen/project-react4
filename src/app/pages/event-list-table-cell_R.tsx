import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const EventListTable = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();


  const viewEventDetail = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/event/${id}`);  
  };

  

  /* useEffect(() => {
    store.eventService.getDocs()
  }, [store.eventService]);*/

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Details</TableCell>
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
            </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
)
        })