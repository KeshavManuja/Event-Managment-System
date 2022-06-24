import { Button } from "@mui/material";
import { EventCard } from "../Components/EventCard";
import Navbar from "../Components/Navbar";
import { EventData } from "../DataAPI";

export const Favourites = () => {
  const eventdata = EventData;
  return (
    <div>
      <Navbar />
      <div className="events-div">
        {eventdata.map((event) => (
          <EventCard key={event.id} item={event} />
        ))}
      </div>

      <div className="pagination-div">
        <Button>Previous</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};
