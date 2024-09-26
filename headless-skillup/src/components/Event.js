import React from "react";
import { useParams } from "react-router-dom";
import { useEventByTitle } from "../api/usePersistedQueries";
import { mapJsonRichText } from "../utils/renderRichText";
import Error from "./Error";
import Loading from "./Loading";
import "./Event.scss";

function Event() {
  // Read the person's `eventTitle` which is the parameter used to query for the Events's details
  const { eventTitle } = useParams();

  // Query AEM for the Event's details, using the `eventTitle` as the filtering parameter
  const { event, error } = useEventByTitle(eventTitle);

  // Handle error and loading conditions
  if (error) {
    return <Error errorMessage={error} />;
  } else if (!event) {
    return <Loading />;
  }

  // Render the Event data
  return (
    <div className="event">
      <img
        className="event__image"
        src={process.env.REACT_APP_HOST_URI+event.eventImage._path}
        alt={event.eventTitle}
      />
      <div className="event__venues">
        {event.venueCity.map((venue, index) => {
          return (
            <span key={index} className="event__venue">
              {venue}
            </span>
          );
        })}
      </div>
      <div className="event__content">
        <h1 className="event__title">{event.eventTitle}</h1>
        <div className="event__description">
          {/* Use this utility to transform multi-line text JSON into HTML */}
          {mapJsonRichText(event.eventDescription.json)}
        </div>

         <div className="event__description">Event Price : {event.eventPrice} $</div>

          <div className="event__description">Venue : {event.venueName}</div>

             <div className="event__description"> Event Date : {event.eventDateAndTime}</div>
      </div>
    </div>
  );
}

export default Event;
