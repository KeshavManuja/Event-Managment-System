
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const EventCard = ({ item }) => {
  const {userRole} = useSelector((store)=> store)
  return (
    <div className="eventcard-div">
        <div style={{display:"flex"}}>
        <h2>Title: {item.title}</h2>
        {userRole && <Checkbox  {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
        </div>
      
      <p>City : {item.address}</p>
      <p>Helding {item.isVirtual ? "Yes" : "No"}</p>
      <p>Category: {item.category}</p>
      <div style={{ display: "flex" }}>
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
