import { Alert, Snackbar } from "@mui/material";
import { useRootStore } from "../state/root-store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const Message = observer(() => {

  const store = useRootStore();
  const [messages] = useState(store.messageStore.messages);

  return (
    <>
      {messages.map((message) =>
        <Snackbar
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          open={message.show}
          autoHideDuration={2000}
          onClose={store.messageStore.clear}
        >
          <Alert
            severity={message!.severity}
            sx={{ width: "100%" }}
            onClose={store.messageStore.clear}
          >
            {message!.text}
          </Alert>
        </Snackbar>
      )
      }
    </>
  );
}) 