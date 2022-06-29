
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Login from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Favourites } from "./Pages/Favourites";
import AddEvent from "./Pages/AddEvent";
import { useCookies } from "react-cookie";
import { setUSerRole } from "./redux/Action";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['userRole']);
  const dispatch = useDispatch()
  const userRole = cookies?.userRole
  if(userRole) dispatch(setUSerRole(userRole)) 
  // const { userRole } = useSelector(store => store);
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
