import React from "react";
import { Link } from "react-router-dom";
import { useAllEvents } from "../api/usePersistedQueries";
import Error from "./Error";
import Loading from "./Loading";
import "./EventLanding.scss";

function EventLanding() {
  const { events, error } = useAllEvents();

  // Handle error and loading conditions
  if (error) {
    return <Error errorMessage={error} />;
  } else if (!events) {
    return <Loading />;
  }

  // Events have been populated by AEM GraphQL query. Display the Events.
  return (
    <div className="eventlanding">
      {events.map((event, index) => {
        return <EventPage key={index} {...event} />;
      })}
    </div>
  );
}

// Render single Event
function EventPage({ title, description, eventList }) {
  // Must have title and at least 1 event
  if (!title || !eventList) {
    return null;
  }

  return (
    <div className="event">
      <h2 className="eventlanding__title">{title}</h2>
      <p className="eventlanding__description">{description.plaintext}</p>
      <div>
        <h4 className="eventlanding__eventlist-title">Events</h4>
        <ul className="eventlanding__eventlist">
          {/* Render the referenced Event models associated with the Event Landing */}
          {eventList.map((event, index) => {
            return (
              <div key={index} className="gallery">
                <Link to={`/event/${event.eventTitle}`}>

                  <img  src={process.env.REACT_APP_HOST_URI+event.eventImage._path} alt={event.eventTitle} width="600" height="400" />
                </Link>
                 <div className="desc">{event.eventTitle}</div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default EventLanding;