import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Home from "./Pages/Home/Home";
import ListCard from './Pages/Home/ListCard'
import HomeRouter from "./Pages/HomeRouter/HomeRouter";
import RouterComponent from './Router';
{/* <RouterComponent/> */}

function App() {
  return (
    <RouterComponent/>
  );
}

export default App;
