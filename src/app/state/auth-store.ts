import {makeAutoObservable} from "mobx";
import {RootStore} from "./root-store";

export interface IAuthUser{
    uid: string;
    isAnonymous: boolean;
    isAdmin: boolean;
    email: string | null;
    displayName: string| null;
}

export class AuthUser implements IAuthUser{
    public uid: string;
    public isAnonymous: boolean;
    public isAdmin: boolean;
    public email: string | null;
    public displayName: string| null;

    constructor({uid, isAnonymous, isAdmin, email, displayName}: 
        { uid: string, isAnonymous: boolean,  isAdmin: boolean, email: string | null , displayName: string| null }) {
        this.uid = uid;
        this.isAnonymous = isAnonymous;
        this.isAdmin = isAdmin;
        this.email = email;
        this.displayName = displayName;

        makeAutoObservable(this);
    }
}

export class AuthStore {
    public currentUser?: AuthUser;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    isUserAdmin(){
        return this.currentUser?.isAdmin;
    }

    setUser(user: IAuthUser) {
        this.currentUser = new AuthUser(user);
    }

    get isConnected() {
        return !!this.currentUser?.email;
    }

    get displayName() {
        return (
            this.currentUser?.displayName ||
            this.currentUser?.email ||
            this.currentUser?.uid.substring(0, 10)
        );
    }
}
