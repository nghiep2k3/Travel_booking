// Router.js
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeRouter from "./Pages/HomeRouter/HomeRouter";
import Login from "./Pages/Login/Login";
import Page from "./Pages/HomeRouter/Page";
import Contact from "./Pages/HomeRouter/Contact";
import Cskh from "./Pages/Cskh/Cskh";
import Home from "./Pages/Home/Home";
import Page_404 from "./Pages/Page_404/Page_404";
import CartItem from "./Pages/CartItem/CartItem"; 
import ManagerTour from "./Pages/ManagerTour/ManagerTour";

import TourOut from "./Pages/HomeRouter/TourOut";
import TourAsia from "./Pages/HomeRouter/TourForeign/TourAsia";
import TourAmericars from "./Pages/HomeRouter/TourForeign/TourAmericars";
import TourEurope from "./Pages/HomeRouter/TourForeign/TourEurope";
import TourAutralia from "./Pages/HomeRouter/TourForeign/TourAutralia";

import HaNoi from "./Pages/HomeRouter/TourDomestic/MienBac/HaNoi";
import CaoBang from "./Pages/HomeRouter/TourDomestic/MienBac/CaoBang";
import InfoTourHaNoi from "./Pages/DetailTour/MienBac/InfoTourHaNoi";
import InfoTourCaoBang from "./Pages/DetailTour/MienBac/InfoTourCaoBang"
import InfoTourHaiDuong from "./Pages/DetailTour/MienBac/InfoTourHaiDuong"
import InfoTourHaiPhong from "./Pages/DetailTour/MienBac/InfoTourHaiPhong";
import InfoTourNhaTrang from "./Pages/DetailTour/MienTrung/InfoTourNhaTrang"
import InfoTourDaNang from "./Pages/DetailTour/MienTrung/InfoTourDangNang";
import InfoTourHue from "./Pages/DetailTour/MienTrung/InfoTourHue";
import InfoTourCaiBe from "./Pages/DetailTour/MienNam/InfoTourCaiBe"
import InfoTourPhuQuoc from "./Pages/DetailTour/MienNam/InfoTourPhuQuoc"
import InfoTourPhuQuoc2 from "./Pages/DetailTour/MienNam/InfoTourPhuQuoc2"

import InfoTourChauAuPhap from "./Pages/DetailTour/TourForeign/InfoTourChauAuPhap";
import InfoTourMy from "./Pages/DetailTour/TourForeign/InfoTourMy";
import InfoTourPhap from "./Pages/DetailTour/TourForeign/InfoTourPhap"
import InfoTourY from "./Pages/DetailTour/TourForeign/InfoTourY"
import InfoTourUc from "./Pages/DetailTour/TourForeign/InfoTourUc"
import InfoTourCanada from "./Pages/DetailTour/TourForeign/InfoTourCanada"
import InfoTourMalaysia from "./Pages/DetailTour/TourForeign/InfoTourMalaysia"
import InfoTourDuThuyen from "./Pages/DetailTour/TourForeign/InfoTourDuThuyen"
import InfoTourHanQuoc from "./Pages/DetailTour/TourForeign/InfoTourHanQuoc"
import InfoTourCampuchia from "./Pages/DetailTour/TourForeign/InfoTourCampuchia"
import InfoTourNamPhi from "./Pages/DetailTour/TourForeign/InfoTourNamPhi"
import InfoTourScotland from "./Pages/DetailTour/TourForeign/InfoTourScotland"

import Payments from "./Pages/Payments/Payments";
import Resgiter from "./Pages/Resgiter/Register";

import Test from "./Test/Test"
import TestDetail from "./Test/Detail"
import Test2 from "./Test/Test2"
import DetailTour from "./Component/DetailTour/DetailTour";

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
          <Route path="/TourAsia" element={<TourAsia />} />
          <Route path="/TourEurope" element={<TourEurope />} />
          <Route path="/TourAmericars" element={<TourAmericars />} />
          <Route path="/TourAutralia" element={<TourAutralia />} />
          <Route path="/HaNoi" element={<HaNoi />} />
          <Route path="/CaoBang" element={<CaoBang />} />
          {/* Detail Tour */}
          <Route path="/InfoTourHaNoi" element={<InfoTourHaNoi />} />
          <Route path="/detail/:id_tour" element={<DetailTour />} />
          <Route path="/InfoTourCaoBang" element={<InfoTourCaoBang />} />
          <Route path="/InfoTourHaiDuong" element={<InfoTourHaiDuong />} />
          <Route path="/InfoTourHaiPhong" element={<InfoTourHaiPhong />} />

          <Route path="/InfoTourNhaTrang" element={<InfoTourNhaTrang />} />
          <Route path="/InfoTourDaNang" element={<InfoTourDaNang />} />
          <Route path="/InfoTourHue" element={<InfoTourHue />} />

          <Route path="/InfoTourCaiBe" element={<InfoTourCaiBe />} />
          <Route path="/InfoTourPhuQuoc" element={<InfoTourPhuQuoc />} />
          <Route path="/InfoTourPhuQuoc2" element={<InfoTourPhuQuoc2 />} />

          {/* Detail Tour Foreign*/}
          <Route path="/InfoTourChauAuPhap" element={<InfoTourChauAuPhap />} />
          <Route path="/InfoTourMy" element={<InfoTourMy />} />
          <Route path="/InfoTourPhap" element={<InfoTourPhap />} />
          <Route path="/InfoTourY" element={<InfoTourY />} />
          <Route path="/InfoTourUc" element={<InfoTourUc />} />
          <Route path="/InfoTourCanada" element={<InfoTourCanada />} />
          <Route path="/InfoTourNamPhi" element={<InfoTourNamPhi />} />

          <Route path="/TourAsia/InfoTourMalaysia" element={<InfoTourMalaysia />} />
          <Route path="/TourAsia/InfoTourDuThuyen" element={<InfoTourDuThuyen />} />
          <Route path="/InfoTourDuThuyen" element={<InfoTourDuThuyen />} />
          <Route path="/TourAsia/InfoTourHanQuoc" element={<InfoTourHanQuoc />} />
          <Route path="/InfoTourHanQuoc" element={<InfoTourHanQuoc />} />
          <Route path="/TourAsia/InfoTourCampuchia" element={<InfoTourCampuchia />} />
          <Route path="/InfoTourCampuchia" element={<InfoTourCampuchia />} />
          
          <Route path="/TourEurope/InfoTourChauAuPhap" element={<InfoTourChauAuPhap />} />
          <Route path="/TourEurope/InfoTourPhap" element={<InfoTourPhap />} />
          <Route path="/TourEurope/InfoTourPhap" element={<InfoTourPhap />} />
          <Route path="/TourEurope/InfoTourY" element={<InfoTourY />} />
          <Route path="/TourEurope/InfoTourScotland" element={<InfoTourScotland />} />
          
          <Route path="/TourAutralia/InfoTourUc" element={<InfoTourUc />} />

          <Route path="/TourAmericars/InfoTourMy" element={<InfoTourMy />} />
          <Route path="/TourAmericars/InfoTourNamPhi" element={<InfoTourNamPhi />} />
          <Route path="/TourAmericars/InfoTourCanada" element={<InfoTourCanada />} />

          
          <Route path="*" element={<Page_404 />} />


        </Route>
      </Routes>
    </div>
  );
}

export default Router;
