
import { Route, Routes } from "react-router";

import "./App.css";
import Login from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Favourites } from "./Pages/Favourites";
import AddEvent from "./Pages/AddEvent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/addevent" element={<AddEvent/>}/>
      </Routes>
    </div>
  );
}

export default App;
