import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li>
          <Link to="/cmdb/">Серверы и ПК</Link>
        </li>
        <li>
          <Link to="/sec/">Раздел</Link>
        </li>
        <li>
          <Link to="/sec/">Раздел</Link>
        </li>
        <li>
          <Link to="/sec/">Раздел</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
