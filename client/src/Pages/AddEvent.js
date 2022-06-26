import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../redux/Action";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";


function AddEvent() {
  const dispatch = useDispatch();
  const [isVirtual, setIsVirtual] = useState(false);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  function handleEventSubmit() {
    const payload = {
      title,
      address,
      category,
      tags: tag,
      isVirtual,
      startDate,
      endDate,
    };
    console.log(payload);
    dispatch(createEvent(payload));
    navigate('/')
  }

  return (
    <div className="add-events-div">
      <i><h3>Add Event</h3></i>
      <TextField
        id="standard-basic"
        label="Enter Event Title"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Enter Category"
        variant="standard"
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Enter Tags"
        variant="standard"
        onChange={(e) => setTag(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Enter address"
        variant="standard"
        onChange={(e) => setAddress(e.target.value)}
      />
      <br/>
      <div>
        <span>From: </span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <br/>
      <div>
        <span>To: </span>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isVirtual}
              onClick={(e)=>setIsVirtual(!isVirtual)}
            />
          }
          label="Isvirual"
        />
        <Button variant="outlined" onClick={handleEventSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AddEvent;
