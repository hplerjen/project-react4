
import {autorun, makeAutoObservable, observable} from "mobx";
import {RootStore} from "./root-store";
import { EventMini } from "src/app/model/eventMini";

export class EventStore {
    public events: { [key: string]: EventMini } = observable({});
    

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);

        autorun(() => {
            rootStore.eventService.getDocs();
        });
    }

    /* useEffect(() => {
        const getUsersData = async () => {
          const data = await getDocs(UsersCollectionRef)
          setUsers(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })))
        }
    
        getUsersData()
    }, [])*/

    add(events: EventMini[]) {
        events.forEach((e) => {
            this.events[e.id!] = e;
        });
    }

    remove(events: EventMini[]) {
        events.forEach((e) => {
            delete this.events[e.id!];
        });
    }

    clear() {
        this.events = {};
    }

    findById(id: string | undefined ): EventMini | undefined {
        return Object.values(this.events).find((e) => e.id === id);
    }

    //FIXME filter future / past events as per event date < date
    

}
