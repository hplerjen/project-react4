import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { FormEvent, useState } from 'react'
import { useRootStore } from '../state/root-store';
import { Severity } from '../model/message';
import { UserLogInRegister } from './user-log';
import { OnlyLoggedInUser } from '../components/user-types-filter';

export const UserInfo = observer(() => {
  const store = useRootStore();
  const [displayName, setDisplayName] = useState("");
  const [pwdOld, setPwdOld] = useState("");
  const [pwdNew, setPwdNew] = useState("");


  //FIXME from Michael
  const resetPwd = (event: FormEvent) => {
    event.preventDefault();
    const email = store.authStore.currentUser?.email;
    if (email) {
      store.authService
        .resetPwdMail(email)
        .then(() => {
          store.messageStore.setMessage({
            show: true,
            text: "Email wurde verschickt",
            severity: Severity.success,
          });
        })
        .catch(() => {
          store.messageStore.setMessage({
            show: true,
            text: "Email konnte nicht verschickt werden",
            severity: Severity.error,
          });
        });
    }
  };

  const changeDisplayname = (event: FormEvent) => {
    event.preventDefault();
    store.authService.changeDisplayName(displayName)()
      .then(() => {
        store.messageStore.setMessage({
          show: true,
          text: "Anzeigename wurde geändert",
          severity: Severity.success,
        });
      })
      .catch((error: Error) => {
        store.messageStore.setMessage({
          show: true,
          text: error.message,
          severity: Severity.error,
        });
      });
  };

  const changePwd = (event: FormEvent) => {
    event.preventDefault();
    store.authService.updatePassword(
      store.authStore.currentUser!.email!,
      pwdOld,
      pwdNew
    )()
      .then(() => {
        store.messageStore.setMessage({
          show: true,
          text: "Password wurde geändert",
          severity: Severity.success,
        });
      })
      .catch((error: Error) => {
        store.messageStore.setMessage({
          show: true,
          text: error.message,
          severity: Severity.error,
        });
      });
  };

  return (

    <div
      style={{
        padding: "10px",
        textAlign: "start",
      }}
    >
      <Typography variant="h6">User Information</Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}>
        <UserLogInRegister />
        <OnlyLoggedInUser>
          <Card className="card">
            <CardContent>
              <Typography className="cardTitel">
                Anzeigename ändern
              </Typography>
              <form
                style={{ display: "flex", flexDirection: "column", alignItems: "start", }}
                onSubmit={changeDisplayname}
              >
                <TextField variant="outlined" type="email" className="textField" value={store.authStore.currentUser?.email} disabled />
                <TextField variant="outlined" type="text" label="Anzeigename" className="textField" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                <Button type="submit">Änderung übernehmen</Button>
              </form>
            </CardContent>
          </Card>
        </OnlyLoggedInUser>
        <OnlyLoggedInUser>
          <Card className="card">
            <CardContent>
              <Typography className="cardTitel">Passwort ändern</Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                onSubmit={changePwd}
              >
                <TextField
                  variant="outlined" type="password" label="Passwort Alt" className="textField" value={pwdOld} onChange={(e) => setPwdOld(e.target.value)} required
                />
                <TextField variant="outlined" type="password" label="Passwort Neu" className="textField" value={pwdNew} onChange={(e) => setPwdNew(e.target.value)} required />
                <Button type="submit">Passwort wechseln</Button>
              </form>
            </CardContent>
          </Card>
        </OnlyLoggedInUser>
        <OnlyLoggedInUser>
          <Card className="card">
            <CardContent>
              <Typography className="cardTitel">Passwort vergessen?</Typography>
              <form style={{ display: "flex", flexDirection: "column", alignItems: "start" }} onSubmit={resetPwd}>
                <Button type="submit">Passwort zurücksetzen</Button>
              </form>
            </CardContent>
          </Card>
        </OnlyLoggedInUser>

      </Box>
    </div>
  )
}
)