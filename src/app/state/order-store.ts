import { makeAutoObservable } from 'mobx';
import { RootStore } from './root-store';
import { OrderMini } from '../model/order-mini';

export class OrderStore {
  public currentOrder?: OrderMini | null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  initializeOrder() {
    if (this.currentOrder === undefined) {
      this.currentOrder = {
        id: '',
        userId: this.rootStore!.authStore!.currentUser
          ? this.rootStore.authStore.currentUser!.uid
          : '',
        productsInCart: new Map<string, number>(),
        numberOfProducts: 0,
        costTotalWithoutPostage: 0,
      };
      console.log(this.currentOrder);
    }
  }

  /*addAddress(addressId: string){
        this.currentOrder!.addressId = addressId;
    }*/

  addProductToCart(prodId: string, number: number = 0) {
    if (this.currentOrder === undefined) {
      this.initializeOrder();
    }
    this.currentOrder!.userId = this.rootStore.authStore.currentUser!.uid;
    const alreadyInOrder = this.currentOrder!.productsInCart.get(prodId!);
    this.currentOrder!.productsInCart.set(
      prodId!,
      alreadyInOrder && alreadyInOrder > 0 ? number + alreadyInOrder : number
    );
    this.calculateNumberOfProductsInCar();
    this.calculateTotalCostsInCart();
  }

  updateProductToCart(prodId: string, number: number) {
    this.currentOrder!.productsInCart.set(prodId!, number);
    this.calculateNumberOfProductsInCar();
    this.calculateTotalCostsInCart();
  }

  //test schreiben
  calculateNumberOfProductsInCar() {
    let counter = 0;
    this.currentOrder!.productsInCart!.forEach((key, value) => {
      counter = counter + key;
      this.currentOrder!.numberOfProducts = counter;
    });
  }

  //test schreiben
  calculateTotalCostsInCart() {
    let costs = 0;
    this.currentOrder!.productsInCart!.forEach((key, value) => {
      const price = this.rootStore!.productStore!.findById(value)
        ? this.rootStore!.productStore!.findById(value)!.price
        : 0;
      costs = costs + price * key;
      this.currentOrder!.costTotalWithoutPostage = costs;
    });
  }
}
