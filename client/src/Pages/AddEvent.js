import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../redux/Action";

function AddEvent() {
    const dispatch = useDispatch();

    function handleEventSubmit() {
        const payload = {
          title,
          address,
          category,
          tags: tag,
          isVirtual: mode,
        };
        console.log(payload)
        dispatch(createEvent(payload));
      }

  return (
    <div className="add-events-div">
      <TextField
        id="standard-basic"
        label="Enter Event Title"
        variant="standard"
      />
      <TextField
        id="standard-basic"
        label="Enter Category"
        variant="standard"
      />
      <TextField id="standard-basic" label="Enter Tags" variant="standard" />
      <TextField id="standard-basic" label="Enter address" variant="standard" />
      <div style={{ marginTop: "20px" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isVirtual}
              onChange={(e) => setIsVirtual(e.target.value)}
            />
          }
          label="Isvirual"
        />
        <Button variant="outlined" onClick={handleEventSubmit}>
          Submit
        </Button>
      </div>
      <div></div>
    </div>
  );
}

export default AddEvent;
