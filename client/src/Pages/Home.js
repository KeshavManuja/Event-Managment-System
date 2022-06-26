import { EventData } from "../DataAPI";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventCard } from "../Components/EventCard";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getEvents } from "../redux/Action";
import { useNavigate } from "react-router";

const categories = [
  "Action",
  "Sci-fi",
  "History",
  "International",
  "Music-festival",
];

export const Home = () => {
  const [isVirtual, setIsVirtual] = useState(false);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const { userRole,events } = useSelector((store) => store);
  console.log("events", events)
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  console.log(title)
  let eventdata = EventData;
  

  return (
    <>
      <Navbar />

      <div className="filter-div">
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-basic"
          label="Enter Title"
          variant="outlined"
          value={title}
        />
        <TextField
          onChange={(e) => setTag(e.target.value)}
          id="outlined-basic"
          label="Enter Tag"
          variant="outlined"
          value={tag}
        />
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          id="outlined-basic"
          label="Enter Address"
          variant="outlined"
          value={address}
        />

        <FormControl>
          <InputLabel id="Categories">Categories</InputLabel>
          <Select
            labelId="Categories"
            id="demo-simple-select-standard"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoWidth
            placeholder="Hogya"
            style={{ width: "120px" }}
          >
            {categories.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <span>From: </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          <span>To: </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>

        <div>
          <FormControl>
            <InputLabel id="demo-simple-select">Mode</InputLabel>
            <Select
              style={{ width: "120px" }}
              labelId="demo-simple-select"
              id="demo-simple-select"
              value={mode}
              autoWidth
              placeholder="Hogya"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="Live">Live</MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          variant="text"
          style={{ color: "dodgerblue" }}
          onClick={()=>{}}
        >
          Submit
        </Button>
      </div>

      <div>
        {userRole && (
          <Button
            variant="outlined"
            onClick={() => navigate('/addevent')}
          >
            Add Event
          </Button>
        )}
        {/* {!addEventToggle && (
          <i class="fa fa-window-close" aria-hidden="true"></i>
        )} */}
      </div>
      
      

      <div className="events-div">
        {eventdata.map((event) => (
          <EventCard key={event.id} item={event} />
        ))}
      </div>

      <div className="pagination-div">
        <Button>Previous</Button>
        <Button>Next</Button>
      </div>
    </>
  );
};
