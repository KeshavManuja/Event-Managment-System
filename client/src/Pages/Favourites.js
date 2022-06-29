import { Alert, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EventCard } from "../Components/EventCard";
import Navbar from "../Components/Navbar";

export const Favourites = () => {
  const { AllEvents } = useSelector((store) => store);
  const { userFav } = useSelector((store) => store);

  var favEvents = AllEvents.filter((event) => userFav.includes(event._id));
  return (
    <div>
      <Navbar />
      {userFav.length === 0 && (
        <Alert className="alert-box" severity="warning">
          There is no favourites yet, please add.
        </Alert>
      )}
      {userFav.length !== 0 && (
        <>
          <div className="events-div">
            {favEvents &&
              favEvents.map((event) => (
                <EventCard key={event._id} item={event} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
