import React, {ReactElement} from "react";
import {observer} from "mobx-react-lite";

//REM guards the routes
export const UserRoute  = observer((isLoggedIn: boolean , {children} : {children : ReactElement}) => {
  if(isLoggedIn){
    return <>{children}</>
  }
  return <></>
});