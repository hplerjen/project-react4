import {Auth, linkWithCredential, reauthenticateWithCredential, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, updatePassword, updateProfile,} from "@firebase/auth";
import {EmailAuthProvider, User} from "firebase/auth";
import {AuthConnect, AuthUserSettingsChange} from "../model/auth";
import { RootStore } from "../store/root-store";
import { Severity } from "../model/message";


//FIXME copy from Michael
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

  connectUser(data: AuthConnect) {
    const user = this.auth.currentUser!;
    linkWithCredential(user, EmailAuthProvider.credential(data.email, data.pwd))
      .then(async (usercred) => {
        const user = usercred.user;
        const isAdmin = await this.isAdmin().then((boolean) => {return boolean});
        this.rootStore.authStore.setUser({...user, isAdmin: isAdmin});
        this.rootStore.messageStore.setMessage({
          show: true,
          text: "Registration successful for user: " + data.email  ,
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

  async login(data: AuthConnect) {
    signInWithEmailAndPassword(this.auth, data.email, data.pwd)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const isAdmin = await this.isAdmin().then((boolean) => {return boolean});
          this.rootStore.authStore.setUser({...user, isAdmin: isAdmin});
          this.rootStore.messageStore.setMessage({
            show: true,
            text: "Loggin successful for user: " + data.email ,
            severity: Severity.success
          });
        })
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

  isAdmin(): Promise<boolean> {
    return this.rootStore.adminService.isAdmin();
  };

  resetPwdMail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  changeUser(data: Partial<AuthUserSettingsChange>) {
    return async () => {
      const currentUser = await this.auth.currentUser!;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const actions = [] as Array<Promise<any>>;

      if (data.displayName && data.displayName !== currentUser.displayName) {
        actions.push(
          updateProfile(currentUser, {
            displayName: data.displayName,
            photoURL: "",
          })
        );
      }
      if (data.email && data.pwd && data.pwdOld) {
        const cred = EmailAuthProvider.credential(data.email, data.pwdOld);
        actions.push(reauthenticateWithCredential(currentUser, cred));
        actions.push(updatePassword(currentUser, data.pwd));
      }
      return Promise.all(actions).then(() => {
        this.rootStore.authStore.setUser({ ...this.auth.currentUser!, isAdmin: false});
      });
    };
  }
}
