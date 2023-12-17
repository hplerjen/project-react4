import React, {ReactElement} from "react";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../state/root-store";


//FIXME Michael
export const OnlyLoggedInUser = observer(({children} : {children : ReactElement}) => {
  const store = useRootStore();
  if(!store.authStore.currentUser?.isAnonymous){
    return <>{children}</>
  }
  return <></>
});

export const AnonymousUser = observer(({children} : {children : ReactElement}) => {
  const store = useRootStore();
  if(store.authStore.currentUser?.isAnonymous){
    return <>{children}</>
  }
  return <></>
});

export const OnlyAdmin = observer(({children} : {children : ReactElement}) => {
  const store = useRootStore();
  if(store.authStore.currentUser?.isAdmin){
    return <>{children}</>
  }
  return <></>
});

