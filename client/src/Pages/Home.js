import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getEvents, setCategories, setFavourites } from "../redux/Action";
import { useNavigate } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { EventCard } from "../Components/EventCard";
import Navbar from "../Components/Navbar";
import { queryPath } from "../utils/queryStringGenerator";


export const Home = () => {
  const [isVirtual, setIsVirtual] = useState(false);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [page,setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [address, setAddress] = useState("");
  const eventdata = useSelector((store) => store.events);
  const { userRole } = useSelector((store) => store);
  const totalpages = useSelector((store)=> store.totalCount)
  const categories = useSelector((store) => store.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getEvents(`?page=${page}`));
    dispatch(setCategories());
  }, [page]);

  function handleFilters() {
    const payload = {
      title,
      address,
      category,
      tags: tag,
      virtual: isVirtual,
      startDate: startDate,
      endDate: endDate,
      page
    };

    const path = queryPath(payload);
    dispatch(getEvents(`?${path}`));
  }

  function clearFeilds() {
    setIsVirtual(false);
    setTitle("");
    setAddress("");
    setCategory("");
    setStartDate();
    setEndDate();
    setTag("");
    setStartDate(null);
    setEndDate(null);
    dispatch(getEvents())
  }
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
            {categories.map((item,index) => {
              return <MenuItem key={index} value={item}>{item}</MenuItem>
          })}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Start-Date"
            inputFormat="dd/MM/yyyy"
            value={startDate}
            onChange={(nd) => {
              
              setStartDate(new Date(nd).toISOString());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="End-Date"
            value={endDate}
            inputFormat="dd/MM/yyyy"
            onChange={(nd) => {
              setEndDate(new Date(nd).toISOString());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div>
          <FormControl>
            <InputLabel id="demo-simple-select">Mode</InputLabel>
            <Select
              style={{ width: "100px" }}
              labelId="demo-simple-select"
              id="demo-simple-select"
              value={isVirtual ? "Virtual" : "Live"}
              autoWidth
              onChange={(e) =>
                e.target.value == "Virtual"
                  ? setIsVirtual(true)
                  : setIsVirtual(false)
              }
            >
              <MenuItem value="Live">Live</MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ marginBottom: "20px", padding: "10px" }}>
        <Button
          variant="outlined"
          style={{marginRight:"10px",color:"green" }}
          onClick={handleFilters}
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          style={{color:"tomato"}}
          onClick={clearFeilds}
        >
          Clear
        </Button>
      </div>
      {eventdata.length === 0 && (
        <Alert severity="warning">
          There are no events
        </Alert>
      )}

      <div>
        {userRole==="manager" && (
          <Button style={{marginBottom:"10px",color:"dodgerblue"}} variant="outlined" onClick={() => navigate("/addevent")}>
            Add Event
          </Button>
        )}
      </div>

      <div className="events-div">
        {eventdata.map((event) => (
          <EventCard key={event._id} item={event} />
        ))}
      </div>

      <div className="pagination-div">

      <Pagination onChange={(e,curPage)=> setPage(curPage)} count={totalpages} variant="outlined" shape="rounded" />
      </div>
    </>
  );
};
