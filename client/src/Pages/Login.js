import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { LoginService } from "../server/LoginService";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="main-box">
      <div className="login-div">
        <h2>Login</h2>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="Enter email"
          variant="outlined"
          fullWidth
        />
        <br/>
        <TextField
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <br/>
        <Button
          variant="contained"
          onClick={() => {
            LoginService({ email, password });
            navigate('/')
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
