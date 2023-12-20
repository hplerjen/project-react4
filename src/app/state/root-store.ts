import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {createContext, useContext} from "react";
import {makeAutoObservable} from "mobx";
import {EventStore} from "./event-store";
import { AuthStore } from "./auth-store";
import { getAuth } from "firebase/auth";
import { EventService } from "../services/event.service";
import { AuthService } from "../services/auth.service";
import { firebaseConfig } from "../firebase.config";
import { ProductStore } from "./product-store";
import { ProductService } from "../services/product.service";
import { OrdersStore } from "./orders-store";
import { OrderService } from "../services/order.service";
import { MessageStore } from "./message-store";
import { AdminService } from "../services/admin.service";
import { OrderStore } from "./order-store";

export class RootStore {
  eventStore: EventStore;
  eventService: EventService;
  productStore: ProductStore;
  productService: ProductService;
  orderStore: OrderStore;
  ordersStore: OrdersStore;
  orderService: OrderService;
  authStore: AuthStore;
  authService: AuthService;
  adminService: AdminService;
  messageStore: MessageStore;

  get init () {
    return this.authStore.currentUser;
  }

  constructor() {
    makeAutoObservable(this);

    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);
    const auth = getAuth(app);

    this.eventService = new EventService( this, db );
    this.eventStore = new EventStore(this);

    this.productService = new ProductService( this, db );
    this.productStore = new ProductStore(this);

    this.orderService = new OrderService( this, db );
    this.ordersStore = new OrdersStore(this);
    this.orderStore = new OrderStore(this);

    this.authStore = new AuthStore(this);
    this.authService = new AuthService(auth, this);

    this.adminService = new AdminService(this, auth, db);

    this.messageStore = new MessageStore(this);
  }
}

export const RootContext = createContext<RootStore>({} as RootStore);
export const StoreRootProvider = RootContext.Provider;
export const useRootStore = (): RootStore => useContext(RootContext);
