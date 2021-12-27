import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import '../App.css'
function Drag(props) {
    return (
        <div>
            <FormControl style={props.style}>
                <InputLabel id="demo-simple-select-label">{props.id}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label= {props.id}
                >
                    {
                        props.filter.map((item) => <MenuItem value={item} onClick={props.filterFunction}>{item}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Drag
