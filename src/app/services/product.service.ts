import {addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, query, QueryConstraint, updateDoc,} from "firebase/firestore";
import { RootStore } from "../state/root-store";
import { ProductMini } from "../model/productMini";

export class ProductService {
  private collectionName = "productsMini";

  public constructor(private rootStore: RootStore, protected db: Firestore) {
    
  }
  
  get collection() {
    return collection  (this.db, this.collectionName)  as CollectionReference<ProductMini, ProductMini>; 
  }

  async doc(id: string) {
    return await doc<ProductMini, ProductMini> (this.collection, `${id}`);
  }

  async getDoc(id: string): Promise<ProductMini | undefined> {
    const docRef = await this.doc(id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }


  async add(product: ProductMini) {
    await addDoc(this.collection, product as DocumentData);
    await this.getDocs();
  }

  async update(product: ProductMini) {
    const docRef = await this.doc(product.id!);
    await updateDoc(docRef, product as DocumentData);
    await this.getDocs();
  }

  async remove(id: string) {
    const docRef : DocumentReference<ProductMini, ProductMini> = await this.doc(id);
    await deleteDoc(docRef);
    await this.getDocs();
  }

  async getDocs(){
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => (
      new ProductMini({ ...doc.data(), id: doc.id})));
    this.rootStore.productStore.add(products);
} 
}
