import React from 'react';

class EventDetail extends React.Component {
  render() {
    return (
        <form>
          <input
            type="text"
            name="title"
            placeholder="title"
          />
          <input
            type="description"
            name="description"
            placeholder="description"
          />
          <button type="submit">Submit</button>
        </form>
        );
      }
   }export default EventDetail;