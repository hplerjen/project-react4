import { Alert, Snackbar } from "@mui/material";
import { useRootStore } from "../state/root-store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const Message = observer(() => {

    const store = useRootStore();
    const [messages] = useState(store.messageStore.messages);

    return (
        <div
          style={{
            padding: "10px",
            textAlign: "start",
          }}
    >
   
          {messages.map((message) =>
            <Alert
                severity={message!.severity}
                sx={{ width: "100%" }}
                >
                {message!.text}
            </Alert>
            )
          }

          </div>
    );
}) 