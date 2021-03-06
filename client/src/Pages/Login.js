import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFavourites, setUserID, setUSerRole } from "../redux/Action";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'userRole', 'userID']);
  const handleLogin = () => {
    axios
      .post("http://localhost:3001/user/login", { email, password })
      .then(({ data }) => {
        setCookie("token", data.token);
        setCookie("userRole", data.role);
        dispatch(setUserID(data.userID));
        dispatch(setFavourites(data.userFav))
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
          type="password"
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
