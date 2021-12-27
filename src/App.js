import './App.css';
import React from 'react'
import { BasicTable } from './components/BasicTable';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import IndividualBanks from "./components/IndividualBanks"


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicTable />}></Route>
          <Route path="/bank-details" element={<IndividualBanks />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
