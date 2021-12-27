import React, { useContext, useEffect, useState} from 'react'
import { filterData } from './data'
import axios from "axios";
import Banktable from './table';
import Drag from './dragDown';

export const BasicTable = () => {
	const { filterCity, filterParam } = filterData
	const [allData, setAllData] = useState({
		loading: true,
		param : "",
		city: "MUMBAI",
		totalData: [],
		data: []
	});
	

	useEffect(() => {
		setAllData((prevState) => ({
			...prevState,
			loading : false
		}))	
		axios
      .get(`https://vast-shore-74260.herokuapp.com/banks?city=${allData.city}`)
      .then((res) => {
        setAllData((prevState) => ({
			...prevState,
			totalData : res.data,
			data : res.data,
			loading : true
		}))	
      })
      .catch((err) => {
        console.log(err);
      });
	}, [allData.city]);
	
	
	
	const changeCity = event => {
		setAllData((prevState) => ({
			...prevState,
			city: event.currentTarget.dataset.value,
		}))		
	}

	const changeParam = e => {
		setAllData((prevState) => ({
			...prevState,
			param : e.currentTarget.dataset.value
		}))
	}

	const changeValue = e => {
		const filterValue = allData.totalData.filter( item => {
			return item[allData.param] == e.target.value
		})
		setAllData((prevState) => ({
			...prevState,
			data : e.target.value.length ? filterValue : allData.totalData
		}))
	}

	if (!allData.loading) {
		return <h1>Load...</h1>
	}
	return (
		<div>
			<div className="header">
				<div className="all-banks">All Banks</div>
				<Drag filter = {filterCity} filterFunction = {changeCity} id = {"City"} style={{ width: "60px" }}/>
				<Drag filter = {filterParam} filterFunction = {changeParam} id = {"Category"} style={{ width: "100px", margin: "0 30px" }}/>
				<div className="search">
					<input placeholder="Search" onChange={changeValue}></input>
				</div>
			</div>
			
			<Banktable allData = {allData}/>
		</div>
	)
}