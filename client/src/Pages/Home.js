import { EventData } from "../DataAPI";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventCard } from "../Components/EventCard";
import HomeService from "../server/HomeService";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router";

const categories = [
  "Action",
  "Sci-fi",
  "History",
  "International",
  "Music-festival",
];

export const Home = () => {
  let eventdata = EventData;

  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [address,setAddress] = useState("");

  function handleSubmit () {
      const payload = {
          title,
        address,
        category,
        tags:tag,
        isVirtual:mode
    }

    HomeService({payload})
}
    

  return (
    <>
        <Navbar/>

      <div className="filter-div">
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-basic"
          label="Enter Title"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setTag(e.target.value)}
          id="outlined-basic"
          label="Enter Tag"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          id="outlined-basic"
          label="Enter Address"
          variant="outlined"
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

        <Button variant="outlined" onClick={()=> handleSubmit()}>Submit</Button>
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
