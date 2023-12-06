
import {autorun, makeAutoObservable, observable} from "mobx";
import {RootStore} from "./root-store";
import { ProductMini } from "../model/productMini";


export class ProductStore {
    public products: { [key: string]: ProductMini } = observable({});

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);

        autorun(() => {
            rootStore.productService.getDocs();
        });
    }

    add(products: ProductMini[]) {
        products.forEach((e) => {
            this.products[e.id!] = e;
        });
    }

    remove(products: ProductMini[]) {
        products.forEach((e) => {
            delete this.products[e.id!];
        });
    }

    clear() {
        this.products = {};
    }

    findById(id: string | undefined ): ProductMini | undefined {
        return Object.values(this.products).find((p) => p.id === id);
    }

}
