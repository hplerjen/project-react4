import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header';
import AddEvent from '../components/AddEvent';
import EventList from '../components/EventList';
import useLocalStorage from '../hooks/useLocalStorage';

const AppRouter = () => {
    const [events, setEvents] = useLocalStorage('events', []);
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
            <Route
              render={(props) => (
                <EventList {...props} events={events} setEvents={setEvents} />
              )}
              path="/"
              exact={true}
            />
            <Route
                    render={(props) => (
                    <AddEvent {...props} events={events} setEvents={setEvents} />)}
                path="/add"
            />

        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;