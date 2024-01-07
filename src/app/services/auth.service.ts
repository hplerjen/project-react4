import {Auth, linkWithCredential, reauthenticateWithCredential, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, updatePassword, updateProfile,} from "@firebase/auth";
import {EmailAuthProvider, User} from "firebase/auth";
import { RootStore } from "../state/root-store";
import { Severity } from "../model/message";


//FIXME from Michael
export class AuthService {
  constructor(public auth: Auth, private rootStore: RootStore) {
    
    auth.onAuthStateChanged(async (user: User | null) => {
      if (user === null) {
        signInAnonymously(auth);
      } else {
        rootStore.authStore.setUser({...user, isAdmin : await this.isAdmin()});
      }
    });
  }

  connectUser(email: string, pwd : string) {
    const user = this.auth.currentUser!;
    linkWithCredential(user, EmailAuthProvider.credential(email, pwd))
      .then(async (usercred) => {
        const user = usercred.user;
        
        //REM isAdmin logic
        const isAdmin = await this.isAdmin().then((boolean) => {return boolean});
        this.rootStore.authStore.setUser({...user, isAdmin: isAdmin});
        this.rootStore.messageStore.setMessage({
          show: true,
          text: "Registration successful for user: " + email  ,
          severity: Severity.success
        });
        //Registration successful for user: laurawinistoerfer@gmx.ch : null
      })
      .catch((error) => {
        this.rootStore.messageStore.setMessage({
          show: true,
          text: error.message , 
          severity: Severity.error
          //Error occured: error code : auth/weak-password error message: Firebase: Password should be at least 6 characters (auth/weak-password).
          //Error occured: error code : auth/invalid-credential error message: Firebase: Error (auth/invalid-credential).
          //Error occured: error code : auth/network-request-failed error message: Firebase: Error (auth/network-request-failed).
        });
      });
  }

  async login(email: string, pwd : string) {
    signInWithEmailAndPassword(this.auth, email, pwd)
        .then(async (cred) => {
          // Signed in
          const user = cred.user;
          //is user admin
          const isAdmin = await this.isAdmin().then((boolean) => {return boolean});
          this.rootStore.authStore.setUser({...user, isAdmin: isAdmin});
          this.rootStore.messageStore.setMessage({
            show: true,
            text: "Loggin successful for user: " + email ,
            severity: Severity.success
          });
        })
        //error handling for firestore
        .catch((error) => {
          this.rootStore.messageStore.setMessage({
            show: true,
            text: error.message ,
            severity: Severity.error
            //Error occured: error code : auth/invalid-credential error message: Firebase: Error (auth/invalid-credential).
            //Error occured: error code : auth/network-request-failed error message: Firebase: Error (auth/network-request-failed).
          });  
        });
  }

  //Admin check is delegated to differnt table
  isAdmin(): Promise<boolean> {
    return this.rootStore.adminService.isAdmin();
  };

  //firebase functionality that sends email to user
  resetPwdMail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  //get credential
  //reauthenticate
  //update password
  updatePassword( email: string, pw: string, pwdNew: string){
    return async() => {
      const user = await this.auth.currentUser!;
      const cred = EmailAuthProvider.credential(email, pw);
      reauthenticateWithCredential(user,cred);
      updatePassword(user, pwdNew);
    }
  }

  changeDisplayName(displayName : string) {
    return async () => {
      const user = await this.auth.currentUser!;
      updateProfile(user, {
            displayName: displayName,
            //REM activate user picture?
            photoURL: "",
      })
      //refresh is user admin
      const isAdmin = await this.isAdmin().then((boolean) => {return boolean});
      this.rootStore.authStore.setUser({... this.auth.currentUser!, isAdmin: isAdmin});        
    }
  }
}