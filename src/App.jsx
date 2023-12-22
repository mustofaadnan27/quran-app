import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from "./pages/Home";
// import DetailSurah from "./api/DetailsurahApi";
// import DetailSurahApi from "./api/DetailsurahApi";
import DetailPages from "./pages/Detail";
// import BasicExample from "./components/Navbar";
import Tafsir from "./components/Tafsir";
// import Data from "./components/body/details/Data";
import Data from "./components/body/home/Data";

import LocalStorage from "./pages/LocalStorage";
// import NavbarCuy from "./pages/Navbar";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surat/:id" element={<DetailPages />} />
        {/* <Route path="/surat/:id" element={<BasicExample />} /> */}
        <Route path="/getdata" element={<Tafsir />} />
        <Route path="/data" element={<LocalStorage />} />
      </Routes>
    </Router>
  )
}

export default App;