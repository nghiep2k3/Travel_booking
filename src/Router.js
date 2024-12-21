// Router.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeRouter from "./Pages/HomeRouter/HomeRouter";
import Login from "./Pages/Login/Login";
import Page from "./Pages/HomeRouter/Page";
import Contact from "./Pages/HomeRouter/Contact";
import Cskh from "./Pages/Admin/Cskh/Cskh";
import Home from "./Pages/Home/Home";
import Page_404 from "./Pages/Page_404/Page_404";
import CartItem from "./Pages/CartItem/CartItem"; 
import ManagerTour from "./Pages/Admin/ManagerTour/ManagerTour";

import TourOut from "./Pages/HomeRouter/TourOut";
import TourAsia from "./Pages/HomeRouter/TourForeign/TourAsia";
import TourAmericars from "./Pages/HomeRouter/TourForeign/TourAmericars";
import TourEurope from "./Pages/HomeRouter/TourForeign/TourEurope";
import TourAutralia from "./Pages/HomeRouter/TourForeign/TourAutralia";
import Payments from "./Pages/Payments/Payments";
import Resgiter from "./Pages/Resgiter/Register";

import Test from "./Test/Test"
import TestDetail from "./Test/Detail"
import Test2 from "./Test/Test2"
import DetailTour from "./Component/DetailTour/DetailTour";
import AddTour from "./Pages/Admin/AddTour/AddTour";



function Router() {
  return (
    <div>

      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/HomeRouter" element={<HomeRouter />}></Route>
        <Route path="/Payments" element={<Payments />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Resgiter" element={<Resgiter />}></Route>

        <Route path="/" element={<HomeRouter />}>
          <Route path="/Test" element={<TestDetail />} />
          {/* <Route path="/Test" element={<Test2 />} /> */}
          <Route path="/Page" element={<Page />} />
          <Route path="/ManagerTour" element={<ManagerTour />} />
          <Route path="/CartItem" element={<CartItem />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/TourOut" element={<TourOut />} />``
          <Route path="/Cskh" element={<Cskh />} />
          <Route path="/AddTour" element={<AddTour />} />
          <Route path="/TourAsia" element={<TourAsia />} />
          <Route path="/TourEurope" element={<TourEurope />} />
          <Route path="/TourAmericars" element={<TourAmericars />} />
          <Route path="/TourAutralia" element={<TourAutralia />} />
          {/* Detail Tour */}
          <Route path="/detail/:id_tour" element={<DetailTour />} />
         
          <Route path="*" element={<Page_404 />} />


        </Route>
      </Routes>
    </div>
  );
}

export default Router;
