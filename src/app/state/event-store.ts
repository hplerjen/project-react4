import { autorun, makeAutoObservable, observable } from 'mobx';
import { RootStore } from './root-store';
import { Timestamp } from 'firebase/firestore';
import { EventM } from '../model/event';

export class EventStore {
  public events: { [key: string]: EventM } = observable({});

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

  add(events: EventM[]) {
    events.forEach((e) => {
      this.events[e.id!] = e;
    });
  }

  remove(events: EventM[]) {
    events.forEach((e) => {
      delete this.events[e.id!];
    });
  }

  clear() {
    this.events = {};
  }

  findById(id: string | undefined): EventM | undefined {
    return Object.values(this.events).find((e) => e.id === id);
  }

  futureEvents() {
    return Object.values(this.events)
      .filter((e) => e.dateFrom.seconds > Timestamp.now().seconds)
      .sort((a, b) => (a.dateFrom.seconds > b.dateFrom.seconds ? 1 : -1));
  }

  pastEvents() {
    return Object.values(this.events)
      .filter((e) => e.dateFrom.seconds < Timestamp.now().seconds)
      .sort((a, b) => (a.dateFrom.seconds > b.dateFrom.seconds ? 1 : -1));
  }
}
