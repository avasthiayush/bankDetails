import React, { useState, useEffect, createContext } from "react"
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { TableContainer, Table, Paper } from '@material-ui/core'
import { useParams } from 'react-router-dom';
import axios from "axios";

const IndividualBanks = () => {
    let [totalData, setTotalData] = useState([]);
    let { city, ifsc } = useParams();
    let [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`)
            .then((res) => {
                setTotalData(res.data);

            })
            .catch((err) => {
                console.log(err);
            });
        const singleData = totalData.filter(x => (
            x.ifsc === ifsc
        ))
        setData(singleData)

    }, [totalData]);

    if (!data.length) {
        return (
            <div>
                <h1> Wait for few seconds I'm Loading :) </h1>
            </div>
        )
    }

    return (

        <div >
            <h1 style={{ "textAlign": "center" }}>Individual Bank</h1>
            <TableContainer style={{ "width": "1000px", "margin": "0 auto", "marginTop": "50px" }} component={Paper}>
                <Table >
                    <TableBody>
                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>Bank Name</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].bank_name}</h4>  </TableCell>
                        </TableRow>

                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>Bank ID</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].bank_id}</h4>  </TableCell>
                        </TableRow>
                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>IFSC</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].ifsc}</h4>  </TableCell>
                        </TableRow>
                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>Branch</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].branch}</h4>  </TableCell>
                        </TableRow>
                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>City</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].city}</h4>  </TableCell>
                        </TableRow>
                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>District</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].district}</h4>  </TableCell>
                        </TableRow>

                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>State</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].state}</h4>  </TableCell>
                        </TableRow>
                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>Address</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>{data[0].address}</h4>  </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default IndividualBanks;
