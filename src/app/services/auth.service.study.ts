//import {Auth, linkWithCredential, reauthenticateWithCredential, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, updatePassword, updateProfile,} from "@firebase/auth";
//import {EmailAuthProvider, User} from "firebase/auth";
import { Auth, sendPasswordResetEmail } from "firebase/auth";
import {AuthConnect, AuthUserSettingsChange} from "../model/auth";
import { RootStore } from "../store/root-store";
//import { Severity } from "../model/message";

//scope:
//onAuthStateChanged
//signInAnonymously
//signInWithEmailAndPassword
//sendPasswordResetEmail

//updateProfile
//sendEmailVerification
//updatePassword

export class AuthService2 {
  constructor(public auth: Auth, private store: RootStore) {
    //TODO
    
  }

  connectUser(data: AuthConnect) {
//TODO
  }


  //signInWithEmailAndPassword(this.auth, data.email, data.pwd)
  //this.rootStore.authStore.setUser({...user, isAdmin: isAdmin});
  async login(data: AuthConnect) {
  //TODO
  }

  isAdmin(): Promise<boolean> {
    return this.store.adminService.isAdmin();
  };

  //sendPasswordResetEmail(this.auth, email);
  resetPwdMail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  //updateProfile(currentUser, {displayName: data.displayName, photoURL: "",}})
  //const cred = EmailAuthProvider.credential(data.email, data.pwdOld);
  //reauthenticateWithCredential(currentUser, cred));
  //updatePassword(currentUser, data.pwd));
  //this.rootStore.authStore.setUser({ ...this.auth.currentUser!, isAdmin: false});

  changeUser(data: Partial<AuthUserSettingsChange>) {
    return async () => {
      //todo
  }
}
}