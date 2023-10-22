/** @format */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CardContext from "./components/context/CardContext";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route
                path='/dashboard'
                element={
                  <CardContext>
                    <Dashboard />
                  </CardContext>
                }
              />
              <Route
                path='/edit/:id'
                element={
                  <CardContext>
                    <Edit />
                  </CardContext>
                }
              />
              <Route path='/*' element={<Navigate to='/dashboard' />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
