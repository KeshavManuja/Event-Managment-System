import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { red } from "@material-ui/core/colors";
import { addFavourites, eventDelete, removeFavourite } from "../redux/Action";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";


export const EventCard = ({ item, page }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token", "userRole", "userID"])
  const dispatch = useDispatch();
  const { userRole } = useSelector((store) => store);
  const { userID } = useSelector((store) => store);
  const { userFav } = useSelector((store) => store);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleFavourites = (favEvent) => {
    const payload = { userID, favEvent };
    if (userFav && userFav.find((el) => el._id === favEvent._id)) {
      dispatch(removeFavourite(favEvent, userID, cookie.token));

    }
    else dispatch(addFavourites(favEvent, userID, cookie.token));

  };

  const handleEventDelete = (event) => {

    if (userID === event.createdBy) {
      dispatch(eventDelete(event._id, page, cookie.token));
      dispatch(removeFavourite(event, userID, cookie.token));
    } else {
      toast.error("You are not authorised to delete this event");
    }
  };

  const isFav = !!userFav.find((ele) => ele._id === item._id);

  return (
    <div className="eventcard-div">
      <div className="title-div">
        <h2>Title: {item.title}</h2>
        {userRole && (
          <Checkbox
            defaultChecked={isFav ? true : false}
            onClick={() => handleFavourites(item)}
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        )}
        {userRole === "manager" && (
          <DeleteOutlineSharpIcon
            sx={{ color: red[500] }}
            onClick={() => handleEventDelete(item)}
          />
        )}
      </div>
      <p>City : {item.address}</p>
      <p>Mode: {item.virtual ? "Virtual" : "Live"}</p>
      <p>Category: {item.category}</p>
      <p>StartDate: {item.startDate.split("T")[0]} </p>
      <p>EndDate: {item.endDate && item.endDate.split("T")[0]}</p>
      <p style={{ padding: "5px" }}><i>{item.description}</i></p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span>Tags: </span>
        {item.tags.map((tag, index) => {
          return (
            <div key={index} className="tags-div">
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};
