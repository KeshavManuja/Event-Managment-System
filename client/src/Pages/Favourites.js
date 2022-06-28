import { Alert, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { EventCard } from "../Components/EventCard";
import Navbar from "../Components/Navbar";

export const Favourites = () => {
  const { userFav } = useSelector((store) => store);
  const { events } = useSelector((store) => store);
  var favEvents = events.filter((event) => userFav.includes(event._id));

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

          <div className="pagination-div">
            <Button>Previous</Button>
            <Button>Next</Button>
          </div>
        </>
      )}
    </div>
  );
};
