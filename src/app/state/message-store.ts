import { makeAutoObservable, observable } from "mobx";
import { RootStore } from "./root-store";
import { Message, Severity } from "../model/message";

export class MessageStore {

    public messages: Message []= observable([]);
    private defaultMessage = {show: false, text: "", severity: Severity.info};
    
    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    setMessage = (message: Message) => (
        this.messages.push(message)
          //this.messages[0] = message
        )
        
    clear = () =>  {
        //this.messages[0]! = this.defaultMessage;
        //this.messages[0].show = false;
        //this.messages[1].show = false;
        //this.messages =  [];
        //this.messages.forEach((message) => message.show = false);  
        this.messages = new Array<Message>(); 
    }
}