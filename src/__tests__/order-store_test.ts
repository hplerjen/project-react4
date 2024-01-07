import 'jest';
import { describe, expect, test } from '@jest/globals';

import { OrderStore } from "../app/state/order-store";
import { useRootStore } from "../app/state/root-store";
import { ProductStore } from 'src/app/state/product-store';

//test fails
test("number of products", () => {
    
    const orderStore = new OrderStore(useRootStore());
    const productsInCart = new Map<string, number>();
    productsInCart.set("1", 2); 
    productsInCart.set("2", 4);
    
    orderStore.currentOrder =  {
        id: "",
        userId: "",
        productsInCart : productsInCart,
        numberOfProducts: 0,
        costTotalWithoutPostage: 0}
    orderStore.calculateNumberOfProductsInCar();
    expect(orderStore.currentOrder.numberOfProducts === 2);

    const productStore = new ProductStore(useRootStore());
    const prod1 = {
        id: "",
        title: "",
        description: "",
        stock: 10,
        price: 10}
        const prod2 = {
            id: "",
            title: "",
            description: "",
            stock: 5,
            price: 5}
        
    productStore.add([prod1, prod2]);
    orderStore.calculateTotalCostsInCart()
    expect(orderStore.currentOrder.costTotalWithoutPostage === 30);
    });
    





