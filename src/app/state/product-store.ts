
import {autorun, makeAutoObservable, observable} from "mobx";
import {RootStore} from "./root-store";
import { ProductMini } from "../model/productMini";


export class ProductStore {
    public products: { [key: string]: ProductMini } = observable({});

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);

        autorun(() => {
            rootStore.eventService.getDocs();
        });
    }

    add(events: ProductMini[]) {
        events.forEach((e) => {
            this.products[e.id!] = e;
        });
    }

    remove(events: ProductMini[]) {
        events.forEach((e) => {
            delete this.products[e.id!];
        });
    }

    clear() {
        this.products = {};
    }

}
