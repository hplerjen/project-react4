import {Auth, linkWithCredential, reauthenticateWithCredential, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, updatePassword, updateProfile,} from "@firebase/auth";
import {EmailAuthProvider, User} from "firebase/auth";
import {AuthConnect, AuthUserSettingsChange} from "../model/auth";
import { RootStore } from "../state/root-store";

   //Checks if user has admin rights
   //function isAdmin() {
  //  return exists(/databases/$(database)/documents/admins/$(request.auth.uid))
  //}

//FIXME copy from Michael
//FIXME solution for admin
export class AuthService {
  constructor(public auth: Auth, private rootStore: RootStore) {
    
    auth.onAuthStateChanged((user: User | null) => {
      if (user === null) {
        signInAnonymously(auth);
      } else {
        rootStore.authStore.setUser({...user, isAdmin: false});
      }
    });
  }

  connectUser(data: AuthConnect) {
    const user = this.auth.currentUser!;
    linkWithCredential(user, EmailAuthProvider.credential(data.email, data.pwd))
      .then((usercred) => {
        const user = usercred.user;
        this.rootStore.authStore.setUser({...user, isAdmin: false});
      })
      .catch((error) => {
         //
      });
  }

  login(data: AuthConnect) {
    signInWithEmailAndPassword(this.auth, data.email, data.pwd)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.rootStore.authStore.setUser({...user, isAdmin: false});
        })
        .catch((error) => {
          
        });
  }

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
