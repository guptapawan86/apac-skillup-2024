
import aemHeadlessClient from "./aemHeadlessClient";
import { useEffect, useState } from "react";

async function fetchPersistedQuery(persistedQueryName, queryParameters) {
   let data;
    let err;

    try {
      // AEM GraphQL queries are asynchronous, either await their return or use Promise-based syntax
      const response = await aemHeadlessClient.runPersistedQuery(
        persistedQueryName,
        queryParameters
      );
      // The GraphQL data is stored on the response's data field
      data = response?.data;
    } catch (e) {
      // An error occurred, return the error messages
      err = e
        .toJSON()
        ?.map((error) => error.message)
        ?.join(", ");
      console.error(e.toJSON());
    }

    // Return the GraphQL and any errors
    return { data, err };
}

/**
 * Custom hook that calls the 'headless-skill-up/all-events' persisted query.
 *
 * @returns an array of Team JSON objects, and array of errors
 */
export function useAllEvents() {
  const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);

    // Use React useEffect to manage state changes
    useEffect(() => {
      async function fetchData() {
        // Call the AEM GraphQL persisted query named "my-project/all-events"
        const { data, err } = await fetchPersistedQuery(
          "headless-skill-up/all-events"
        );
        // Sets the events variable to the list of team JSON objects
        setEvents(data?.eventLandingModelList?.items);
        // Set any errors
        setError(err);
      }
      // Call the internal fetchData() as per React best practices
      fetchData();
    }, []);

    // Returns the events and errors
    return { events, error };
}

/**
 * Calls the 'headless-skill-up/event-by-title' and provided the {eventTitle} as the persisted query's `name` parameter.
 *
 * @param {String!} eventTitle the full
 * @returns a JSON object representing the event
 */
export function useEventByTitle(eventTitle) {

  const [event, setEvent] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // The key is the variable name as defined in the persisted query, and may not match the model's field name
      const queryParameters = { name: eventTitle };

      // Invoke the persisted query, and pass in the queryParameters object as the 2nd parameter
      const { data, err } = await fetchPersistedQuery(
        "headless-skill-up/event-by-title",
        queryParameters
      );

      if (err) {
        // Capture errors from the HTTP request
        setErrors(err);
      } else if (data?.eventDetailList?.items?.length === 1) {
        // Set the event data after data validation
        setEvent(data.eventDetailList.items[0]);
      } else {
        // Set an error if no event could be found
        setErrors(`Cannot find event with name: ${eventTitle}`);
      }
    }
    fetchData();
  }, [eventTitle]);

  return { event, errors };
}
