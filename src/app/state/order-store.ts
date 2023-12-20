import {makeAutoObservable} from "mobx";
import {RootStore} from "./root-store";
import { OrderMini } from "../model/orderMini";
import { AddressMini } from "../model/addressMini";


export class OrderStore {
    public currentOrder?: OrderMini;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    addAddress(address: AddressMini){
        if (this.currentOrder) this.currentOrder!.address = address;
    }

}
