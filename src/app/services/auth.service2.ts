/* eslint-disable @typescript-eslint/no-unused-vars */
import {Auth, User } from "@firebase/auth";
import { RootStore } from "../state/root-store";
import { EmailAuthProvider, linkWithCredential, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { Severity } from "../model/message";

   //Checks if user has admin rights
   //function isAdmin() {
  //  return exists(/databases/$(database)/documents/admins/$(request.auth.uid))
  //}

export interface Login {
    email: string
    pwd : string
}

export class AuthService2 {
  constructor(public auth: Auth, private rootStore: RootStore) {
    auth.onAuthStateChanged((user: User | null) => {
        if (user === null) {
          signInAnonymously(auth);
        } else {
          rootStore.authStore.setUser({...user, isAdmin: false});
        }
      });
    };

    registerUser(data:Login) {
        const user = this.auth.currentUser!;
        linkWithCredential(user, EmailAuthProvider.credential (data.email, data.pwd))
        .then((usercredential) => {
            const user = usercredential.user;
            this.rootStore.authStore.setUser({...user, isAdmin: false});
        })
        .catch((error) => { 
            this.rootStore.messageStore.setMessage({
                text: "Error occured: error code : " + error.code 
                + " error message: " + error.message ,
                severity: Severity.error
        });
    })
    }



    login(data: Login){
        const user = this.auth.currentUser!;
        signInWithEmailAndPassword(this.auth, data.email, data.pwd)
        .then((usercredential) => {
            const user = usercredential.user;
            this.rootStore.authStore.setUser({ ...user, isAdmin: false});
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //Message
        })
    }


}
    
 