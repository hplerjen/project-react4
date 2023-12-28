import { makeAutoObservable, observable } from "mobx";
import { RootStore } from "./root-store";
import { Message } from "../model/message";

export class MessageStore {

    public messages: Message []= observable([]);
    
    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    setMessage = (message: Message) => (this.messages.push(message))
        
    clear = () =>  {
        this.messages[0].show = false;
    }
}