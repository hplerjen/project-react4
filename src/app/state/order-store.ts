import {makeAutoObservable} from "mobx";
import {RootStore} from "./root-store";
import { OrderMini } from "../model/orderMini";


export class OrderStore {
    public currentOrder?: OrderMini;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

}
