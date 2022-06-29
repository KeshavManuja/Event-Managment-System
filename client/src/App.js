
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Login from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Favourites } from "./Pages/Favourites";
import AddEvent from "./Pages/AddEvent";
import { useCookies } from "react-cookie";
import { setFavourites, setUserID, setUSerRole } from "./redux/Action";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['userRole']);
  const token = cookies.token
  const dispatch = useDispatch()
  const userRole = cookies?.userRole
  if(userRole) dispatch(setUSerRole(userRole)) 
  // const { userRole } = useSelector(store => store);

  useEffect(()=> {
      axios.post("http://localhost:3001/user/fetchuser",{token:token})
        .then(({data}) => {
          console.log(data)
          dispatch(setUSerRole(data.role))
          dispatch(setUserID(data._id))
          dispatch(setFavourites(data.favourites))
        })
        .catch((err)=> {
          console.log(err.message)
        })
  },[])
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        {userRole?
        <>
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/addevent" element={<AddEvent/>}/>
        <Route path="*" element={<Home/>}/>
        </>:
        <Route path="*" element={<Login/>}/>
      }
        
      </Routes>
    </div>
  );
}

export default App;
