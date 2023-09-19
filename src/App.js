import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./sidebar.js";
import EndPoints from "./endPoints.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <Routes>
          <Route path="/cmdb/endPoints" element={<EndPoints />}></Route>
          <Route path="/sec/"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
