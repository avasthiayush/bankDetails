import React from "react"
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { TableContainer, Table, Paper } from '@material-ui/core'
import { useLocation } from 'react-router-dom';

const IndividualBanks = () => {
    // const location = useLocation();
    // console.log(location.state);

    return (
        <div >
            <h1 style={{ "textAlign": "center" }}>Individual Bank</h1>
            <TableContainer style={{ "width": "1000px", "margin": "0 auto", "marginTop": "50px" }} component={Paper}>
                <Table >
                    <TableBody>
                        <TableRow style={{ "borderBottom": "2px solid black" }}>
                            <TableCell style={{ "textAlign": "center" }}> <h5><b>Bank Name</b></h5>  </TableCell>
                            <TableCell style={{ "textAlign": "center" }}> <h4>lol</h4>  </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default IndividualBanks;
