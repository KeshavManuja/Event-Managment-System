import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { deleteUSerRole } from "../redux/Action";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userRole } = useSelector((store) => store);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  function handleLogStatus() {
    if (userRole) {
      removeCookie("token");
      removeCookie("userRole");
      dispatch(deleteUSerRole());
      toast.success("Logged out successfully!");
    }
    navigate('/login')
  }
  return (
    <div className="navbar-div">
      <div>
        <Link className="nav-buttons" to="/">
          Home
        </Link>
        {userRole && <Link className="nav-buttons" to="/favourites">
          Favourites
        </Link>}

        {userRole === "manager" && <Link className="nav-buttons" to="/myevents">
          My Events
        </Link>}
      </div>

      <div>
        <Button onClick={handleLogStatus}>
          {userRole ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
