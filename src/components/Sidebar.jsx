/** @format */

import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      {/* <!-- Sidebar (3 columns) --> */}
      <div className='col-md-3 sidebar'>
        <h1>Notes App</h1>
        <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
          <button className='notes-button'>
            <i className='fa-regular fa-note-sticky'></i>Notes
          </button>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
