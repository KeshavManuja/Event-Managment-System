import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { LoginService } from "../server/LoginService";
import { useNavigate } from "react-router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUSerRole } from "../redux/Action";
import {toast} from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/user/login", { email, password })
      .then(({ data }) => {
        setCookie("token", data.token);
        dispatch(setUSerRole(data.role));
        console.log(data)
        toast.success(data.message)
        navigate("/");
      })
      .catch(() => {
        toast.error("Something went wrong!")
        
      });
  };

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
        <br />
        <TextField
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <br />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
