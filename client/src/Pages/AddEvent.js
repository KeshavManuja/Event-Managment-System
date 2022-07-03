import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../redux/Action";
import { useNavigate } from "react-router";
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCookies } from "react-cookie";

function AddEvent() {
  const dispatch = useDispatch();
  const [isVirtual, setIsVirtual] = useState(false);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("");
  const userID = useSelector((store) => store.userID)
  const [cookie, setCookie, removeCookie] = useCookies(["token"])
  const navigate = useNavigate();
  function handleEventSubmit() {
    const payload = {
      title,
      address,
      category,
      description,
      tags: tag,
      virtual: isVirtual,
      startDate,
      endDate,
      createdBy: userID
    };
    dispatch(createEvent({ payload, token: cookie.token }));
    // navigate('/')
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
        label="Enter Description"
        variant="standard"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Enter address"
        variant="standard"
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Start-Date"
            inputFormat="dd/MM/yyyy"
            value={startDate}
            onChange={(nd) => setStartDate(nd)}
            renderInput={(params) => <TextField {...params} />}
          />
          <br />
          <br />
          <DesktopDatePicker
            label="End-Date"
            inputFormat="dd/MM/yyyy"
            value={endDate}
            onChange={(nd) => setEndDate(nd)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div style={{ marginTop: "20px" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isVirtual}
              onClick={(e) => setIsVirtual(!isVirtual)}
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
