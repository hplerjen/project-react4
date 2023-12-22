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

    addProductToCart(prodId: string, number: number = 0){
        this.currentOrder!.productsInCart.set(prodId!,  number);

    }

    updateProductToCart(prodId: string, number: number){
        this.currentOrder!.productsInCart.set(prodId!,  number);
    }

    calculateNumberOfProductsInCar(){
        let counter = 0;
        this.currentOrder!.productsInCart!.forEach((key, value) => {
            counter = counter + key;
            this.currentOrder!.numberOfProducts = counter;
        });
    }

    calculateTotalCostsInCart(){
        let costs = 0;
        this.currentOrder!.productsInCart!.forEach((key, value) => {
            let price = 0;
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            price = this.rootStore!.productStore!.findById(value)?.price!;
            costs = costs + (price * key);
        });


        }
    }

