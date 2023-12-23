import {Outlet} from "react-router-dom";

import "./layout.css";
import { Appbar } from "./app-bar";
import { Message } from "./message";
import { Alert, Snackbar } from "@mui/material";
import { useRootStore } from "../state/root-store";

export const Layout = () => {
  const mainStore = useRootStore();
  
  return (
    <div className="layout">
      <Snackbar
        anchorOrigin={{horizontal: "right", vertical: "top"}}
        open={mainStore.messageStore.messages[0]?.show}
        autoHideDuration={6000}
        onClose={mainStore.messageStore.clear}
      >
        <Alert
          onClose={mainStore.messageStore.clear}
          severity={mainStore.messageStore.messages[0]?.severity}
          sx={{ width: "100%" }}
        >
          {mainStore.messageStore.messages[0]?.text}
        </Alert>
      </Snackbar>
      <Appbar></Appbar>
      {/*<Message></Message>*/}
      <Outlet />
    </div>
  );
};
