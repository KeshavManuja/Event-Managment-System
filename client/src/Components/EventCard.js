
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { red } from '@material-ui/core/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const EventCard = ({ item }) => {
  const {userRole} = useSelector((store)=> store)

  return (
    <div className="eventcard-div">
        <div className='title-div'>
        <h2>Title: {item.title}</h2>
        {userRole && <Checkbox  {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
        {userRole && <DeleteOutlineSharpIcon  sx={{ color: red[500] }}/>}
        </div>
      <p>City : {item.address}</p>
      <p>Mode: {item.virtual ? "Virtual" : "Live"}</p>
      <p>Category: {item.category}</p>
      <p>Dated: { item.startDate} </p>
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
