import {collection, CollectionReference, Firestore, getDocs, query, } from "firebase/firestore";
import { Admin } from "../model/admin";
import { Auth } from "firebase/auth";
import { RootStore } from "../state/root-store";
import { Severity } from "../model/message";

export class AdminService {
  private collectionName = "admin";

  public constructor(private rootStore: RootStore,
    public auth: Auth, protected db: Firestore) {
    
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<Admin, Admin>; 
  }

  isAdmin() : boolean {
    const q = query(this.collection);
    getDocs(q).then((querySnapshot) => {
      const admins = querySnapshot.docs.map((doc) => (
        new Admin({ ...doc.data(), id: doc.id})));
        //FIXME does not work yet
        const isAdmin = (admins.filter((a: Admin) => a.uid === this.auth.currentUser?.uid)).length > 0
        if (isAdmin) {
          this.rootStore.messageStore.setMessage({
          text: "Welcome Admin: " + this.auth.currentUser?.email,
          severity: Severity.success
          });
        }
        return isAdmin;
    })
    .catch((error) => {
      this.rootStore.messageStore.setMessage({
        text: "ADMIN: Error occured: error code : " + error.code 
        + " error message: " + error.message ,
        severity: Severity.error
      });
      return false;
    }) 
    return false;
  };
    
    //REM better do a proper error handling here wiht then and catch
    //const querySnapshot = await getDocs(q);
     //const admins = querySnapshot.docs.map((doc) => (
     //  new Admin({ ...doc.data(), id: doc.id})));
     //const isAdmin = (admins.filter((a: Admin) => a.uid === this.auth.currentUser?.uid)).length > 0
     //if (isAdmin) {
     //  this.rootStore.messageStore.setMessage({
     //  text: "Welcome Admin: " + this.auth.currentUser?.email,
     //  severity: Severity.success
     //  });
     //}
    //return isAdmin;
}
