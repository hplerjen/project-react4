
import {autorun, makeAutoObservable, observable} from "mobx";
import {RootStore} from "./root-store";
import { EventDto } from "src/app/model/eventMini";

export class EventStore {
    public events: { [key: string]: EventDto } = observable({});

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);

        autorun(() => {
            rootStore.eventService.getDocs();
        });
    }

    add(events: EventDto[]) {
        events.forEach((e) => {
            this.events[e.id!] = e;
        });
    }

    remove(events: EventDto[]) {
        events.forEach((e) => {
            delete this.events[e.id!];
        });
    }

    clear() {
        this.events = {};
    }

}
