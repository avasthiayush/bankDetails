import logo from './logo.svg';
import './App.css';
import Banks from './components/Banks'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import IndividualBanks from './components/IndividualBanks';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Banks />}></Route>
          <Route path="/bank-details/:city/:ifsc" element={<IndividualBanks />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
