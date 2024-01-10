import React, { ReactElement } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";

//REM guards the routes
export const OnlyLoggedInUser = observer(({ children }: { children: ReactElement }) => {
  const store = useRootStore();
  if (!store.authStore.currentUser?.isAnonymous) {
    return <>{children}</>
  }
  return <></>
});

export const AnonymousUser = observer(({ children }: { children: ReactElement }) => {
  const store = useRootStore();
  if (store.authStore.currentUser?.isAnonymous) {
    return <>{children}</>
  }
  return <></>
});



export const AdminRoute2 = observer(({ children }: { children: ReactElement }) => {
  if (useRootStore().authStore.currentUser?.isAdmin) {
    return <>{children}</>
  }
  return <></>
});

