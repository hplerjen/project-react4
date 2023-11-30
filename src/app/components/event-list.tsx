import { EventAdd } from "./event-add";
export interface EventListProps {}

//FIXME observable
export function EventList(props: EventListProps) {
  
  const events = [ 
    { id: 1, title: 'title 1', description: 'description 1' },
    { id: 2, title: 'title 2', description: 'description 2' },
    { id: 3, title: 'title 3', description: 'description 3' }] ;
  
  const eventList = events.map(event => {
  return <li>id: {event.id}, title: {event.title}, description: {event.description}</li>});

  
  
  return (
    <div className='container'>
      <h1>Welcome to EventList!</h1>
      <ul> {eventList}</ul>
      <EventAdd></EventAdd>
    </div>

  );
}

