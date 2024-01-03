import {collection, CollectionReference, Firestore, getDocs, query, } from "firebase/firestore";
import { Admin } from "../model/admin";
import { Auth } from "firebase/auth";
import { RootStore } from "../store/root-store";
import { Severity } from "../model/message";

export class AdminService {
  private collectionName = "admin";

  public constructor(private rootStore: RootStore,
    public auth: Auth, protected db: Firestore) {
    
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<Admin, Admin>; 
  }

  async isAdmin(): Promise<boolean> {
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const admins = querySnapshot.docs.map((doc) => (new Admin({ ...doc.data(), id: doc.id})));
    const isAdmin = (admins.filter((a: Admin) => a.uid === this.auth.currentUser?.uid)).length > 0
    if (isAdmin) {
          this.rootStore.messageStore.setMessage({
          show : true,
          text: "Welcome Admin: " + this.auth.currentUser?.email,
          severity: Severity.success
          });
        }
    return isAdmin; 
  };
    
}
