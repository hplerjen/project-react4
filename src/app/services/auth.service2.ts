import {Auth, } from "@firebase/auth";
import { RootStore } from "../state/root-store";
import { EmailAuthProvider, linkWithCredential, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "../model/user";

   //Checks if user has admin rights
   //function isAdmin() {
  //  return exists(/databases/$(database)/documents/admins/$(request.auth.uid))
  //}

export class AuthService2 {
  constructor(public auth: Auth, private rootStore: RootStore) {
        signInAnonymously(auth);
    };

    registerUser(data: User) {
        const user = this.auth.currentUser!;
        linkWithCredential(user, EmailAuthProvider.credential (data.email, data.))
        .then((usercredential) => {
            const user = usercredential.user;
            this.rootStore.authStore.setUser(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //Message
        });
            //
        }

    login(data: User){
        const user = this.auth.currentUser!;
        signInWithEmailAndPassword(this.auth, data.email, data.pwd)
        .then((usercredential) => {
            const user = usercredential.user;
            this.rootStore.authStore.setUser(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //Message
        })
    }


}
    
 