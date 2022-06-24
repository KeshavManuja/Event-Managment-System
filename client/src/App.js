import "./App.css";
import Login from "./Pages/Login";
import { Home } from "./Pages/Home";

import { Route, Routes } from "react-router";

import { Favourites } from "./Pages/Favourites";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
