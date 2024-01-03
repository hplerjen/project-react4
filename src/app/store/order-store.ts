import {makeAutoObservable} from "mobx";
import {RootStore} from "./root-store";
import { OrderMini } from "../model/orderMini";


export class OrderStore {
    public currentOrder?: OrderMini | null

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    initializeOrder(){
        this.currentOrder = {
            id: "",
            userId: this.rootStore.authStore.currentUser!.uid,
            productsInCart : new Map <string,  number>,
            numberOfProducts: 0,
            costTotalWithoutPostage: 0,
            costTotal: 0,
            addressId: ""}
    }
    
    addAddress(addressId: string){
        this.currentOrder!.addressId = addressId;
    }

    addProductToCart(prodId: string, number: number = 0){
        if (this.currentOrder  === undefined) {
            this.initializeOrder();
        }
        this.currentOrder!.productsInCart.set(prodId!,  number);
        this.calculateNumberOfProductsInCar();
        this.calculateTotalCostsInCart();

    }

    updateProductToCart(prodId: string, number: number){
        this.currentOrder!.productsInCart.set(prodId!,  number);
        this.calculateNumberOfProductsInCar();
        this.calculateTotalCostsInCart();
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
            this.currentOrder!.costTotalWithoutPostage = costs;
        });


        }
    }

