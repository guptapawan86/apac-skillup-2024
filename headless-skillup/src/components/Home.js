import React from "react";
import EventLanding from "./EventLanding";
import "./Home.scss";

/***
 * Displays a grid of Event Landing & Event detail Link to find more details
 */
function Home() {
  return (
    <div className="home">
      <h2 className="home__title">Top Upcoming Events </h2>
      <EventLanding />
    </div>
  );
}

export default Home;
