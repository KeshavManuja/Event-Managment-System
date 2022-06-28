import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { red } from "@material-ui/core/colors";
import { addFavourites, eventDelete, removeFavourite } from "../redux/Action";
import { toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export const EventCard = ({ item }) => {
  const { userRole } = useSelector((store) => store);
  var { userID } = useSelector((store) => store);
  const { userFav } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFavourites = (eventID) => {
    const payload = { userID, eventID };
    if (userFav.includes(eventID)) {
      dispatch(removeFavourite(payload));
    } 
    else {
      dispatch(addFavourites(payload));
    }
  };

  const handleEventDelete = (createdBy, eventID) => {
    if (userID === createdBy) {
      dispatch(eventDelete(eventID));
    } else {
      toast.error("You are not authorised to delete this event");
    }
  };

  return (
    <div className="eventcard-div">
      <div className="title-div">
        <h2>Title: {item.title}</h2>
        {userRole && (
          <Checkbox
            defaultChecked={userFav && userFav.includes(item._id) ? true : false}
            onClick={() => handleFavourites(item._id)}
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        )}
        {userRole && (
          <DeleteOutlineSharpIcon
            sx={{ color: red[500] }}
            onClick={() => handleEventDelete(item.createdBy, item._id)}
          />
        )}
      </div>
      <p>City : {item.address}</p>
      <p>Mode: {item.virtual ? "Virtual" : "Live"}</p>
      <p>Category: {item.category}</p>
      <p>Dated: {item.startDate} </p>
      <p>EndDate: {item.endDate}</p>
      <div style={{ display: "flex" }}>
        <span>Tags: </span>
        {item.tags[0].split(" ").map((tag, index) => {
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
