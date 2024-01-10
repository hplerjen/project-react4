import React from "react";
import {observer} from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useRootStore } from "../state/root-store";
import { PageNotAuth } from "../pages/page-not-auth";

//REM guards the routes
export const AdminRoute  = observer(() => {
  if(useRootStore().authStore.currentUser?.isAdmin){
    return <Outlet/>
  }
  return <PageNotAuth/>
});

