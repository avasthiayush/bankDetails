import React, { useState, useEffect , createContext } from "react";
import axios from "axios";
import _, { min } from "lodash";
import "font-awesome/css/font-awesome.min.css";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';
// import IndividualBanks from "./individualBanks";
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';

const pageSize = 10;
function Banks() {
  let [isloaded, setLoaded] = useState(0);
  let [totalData, setTotalData] = useState([]);
  let [data, setData] = useState([]);
  let [index, setIndex] = useState(0);
  let [city, setCity] = useState("MUMBAI");
  let [parameter, setParameter] = useState("bank_name");
  let [name, setName] = useState("");
  let [globalData, setGlobal] = useState([]);

  const userContext = createContext();


  useEffect(() => {
    axios
      .get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`)
      .then((res) => {
        setTotalData(res.data);
        setGlobal(res.data);
        const tempData = [];
        for (let index = 0; index < Math.min(res.data.length, 10); index++) {
          tempData.push(res.data[index]);
        }
        console.log(tempData);
        setData(tempData);
        setLoaded(1);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [city]);

  const handleClick = event => {
    setCity(event.currentTarget.dataset.value);
    const tempData = [];
    for (let index = 0; index < Math.min(globalData.length, 10); index++) {
      tempData.push(globalData[index]);
    }
    setData(tempData);
    setTotalData(globalData);
    setIndex(0);
  }

  const handleClick2 = event => {
    setParameter(event.currentTarget.dataset.value);

    console.log(event.currentTarget.dataset.value);
  }

  useEffect(() => {
    const temp = []
    for (let i = 0; i < globalData.length; i++) {
      if (parameter == "bank_name") {
        if (globalData[i].bank_name == name) {
          temp.push(globalData[i]);
        }
      } else if (parameter == "ifsc") {
        if (globalData[i].ifsc == name) {
          temp.push(globalData[i]);
        }
      } else if (parameter == "branch") {
        if (globalData[i].branch == name) {
          temp.push(globalData[i]);
        }
      } else if (parameter == "bank_id") {
        if (globalData[i].bank_id == parseInt(name)) {
          temp.push(globalData[i]);
        }
      } else if (parameter == "address") {
        if (globalData[i].address == name) {
          temp.push(globalData[i]);
        }
      }
    }
    console.log(temp);
    setTotalData(temp);
    const tempData = [];
    for (let index = 0; index < Math.min(temp.length, 10); index++) {
      tempData.push(temp[index]);
    }
    setData(tempData);
    setIndex(0);
  }, [name]);

  const handleChange = e => {
    setName(e.target.value);
  }

  function changePage(idx) {
    if (idx < 0) idx = 0;
    if (idx == Math.ceil((totalData.length + 1) / 10)) idx--;
    setIndex(idx);
    let left = idx * 10;
    let right = Math.min(totalData.length, left + 10);
    const tmp = [];
    for (let i = left; i < right; i++) tmp.push(totalData[i]);
    setData(tmp);
  }
  if (!isloaded) {
    return (
      <div>
        <h1> Wait for few seconds I'm Loading :) </h1>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="header">
        <div className="all-banks">All Banks</div>

        <FormControl style={{ width: "10%" }}>
          <InputLabel id="demo-simple-select-label">Select City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select City"
          >
            <MenuItem value={"MUMBAI"} onClick={handleClick}>MUMBAI</MenuItem>
            <MenuItem value={"DELHI"} onClick={handleClick}>DELHI</MenuItem>
            <MenuItem value={"BANGLORE"} onClick={handleClick}>BANGALORE</MenuItem>
            <MenuItem value={"KOLKATA"} onClick={handleClick}>KOLKATA</MenuItem>
            <MenuItem value={"CHENNAI"} onClick={handleClick}>CHENNAI</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "12%", margin: "0 30px" }}>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Category"
          >
            <MenuItem value={"bank_name"} onClick={handleClick2}>Bank</MenuItem>
            <MenuItem value={"ifsc"} onClick={handleClick2}>IFSC</MenuItem>
            <MenuItem value={"branch"} onClick={handleClick2}>Branch</MenuItem>
            <MenuItem value={"bank_id"} onClick={handleClick2}>Bank Id</MenuItem>
            <MenuItem value={"address"} onClick={handleClick2}>Address</MenuItem>
          </Select>
        </FormControl>

        <div className="search">
          <input placeholder="Search" onChange={handleChange}></input>
          {/* <button type="submit" onClick={handleClick3} 
          style={{margin: "10px" , backgroundColor: "transparent" , borderRadius: "10px" , width: "75%"}}> Submit</button> */}
        </div>
      </div>

      <div id="table_view">
        <table className="table">
          <thead bgcolor="#C0C0C0">
            <tr className="Row">
              <th scope="col">Bank</th>
              <th scope="col">IFSC</th>
              <th scope="col">Branch</th>
              <th scope="col">Bank ID</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data, index) => (
                <tr key={index}>
                    <Link to={`bank-details/${city}/${data.ifsc}`}><td>{data.bank_name}</td></Link>
                    <td>{data.ifsc}</td>
                    <td>{data.branch}</td>
                    <td>{data.bank_id}</td>
                    <td>{data.address}</td>
                  </tr>
              ))}
        </tbody>
      </table>
      <div className="paggination">
        <div className="box1">Row per page: 10</div>
        <div className="box2">
          <i
            className="fa fa-angle-left"
            aria-hidden="true"
            onClick={() => changePage(index - 1)}
          ></i>
          {index * 10 + 1} - {Math.min((index + 1) * 10, totalData.length)}{" "}
          out of
        </div>
        <div className="box3">
          {totalData.length}
          <i
            className="fa fa-angle-right"
            aria-hidden="true"
            onClick={() => changePage(index + 1)}
          ></i>
        </div>
      </div>
    </div>
    </div >
  );
}

export default Banks;
