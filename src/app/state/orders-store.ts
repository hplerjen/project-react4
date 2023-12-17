
import {autorun, makeAutoObservable, observable} from "mobx";
import {RootStore} from "./root-store";
import { OrderMini } from "../model/orderMini";

export class OrdersStore {
    public orders: { [key: string]: OrderMini } = observable({});

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);

        autorun(() => {
            rootStore.orderService.getDocs();
        });
    }

    add(orders: OrderMini[]) {
        orders.forEach((e) => {
            this.orders[e.id!] = e;
        });
    }

    

    remove(orders: OrderMini[]) {
        orders.forEach((e) => {
            delete this.orders[e.id!];
        });
    }

    clear() {
        this.orders = {};
    }

    findById(id: string | undefined ): OrderMini | undefined {
        return Object.values(this.orders).find((p) => p.id === id);
    }

}
