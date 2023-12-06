import React, {ReactElement} from "react";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../state/root-store";



export const OnlyUser = observer(({children} : {children : ReactElement}) => {
  const store = useRootStore();
  if(!store.authStore.currentUser?.isAnonymous){
    return <>{children}</>
  }
  return <></>
});

export const OnlyAnonymous = observer(({children} : {children : ReactElement}) => {
  const store = useRootStore();
  if(store.authStore.currentUser?.isAnonymous){
    return <>{children}</>
  }
  return <></>
});

