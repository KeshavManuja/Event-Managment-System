
import { Route, Routes } from "react-router";
import { useDispatch } from "react-redux";

import "./App.css";
import Login from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Favourites } from "./Pages/Favourites";
import AddEvent from "./Pages/AddEvent";
import { useCookies } from "react-cookie";
import { setUSerRole } from "./redux/Action";
import { MyEvents } from "./Pages/MyEvents";


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token', "userRole"]);
  const dispatch = useDispatch();

  const userRole = cookies?.userRole
  if (userRole) dispatch(setUSerRole(userRole))

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        {userRole ?
          <>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path='/myevents' element={<MyEvents />} />
            <Route path="*" element={<Home />} />

          </> :
          <Route path="*" element={<Login />} />
        }

      </Routes>
    </div>
  );
}

export default App;
