import React, { useState } from 'react'
import { PieChart } from '@rsuite/charts';

export default function Chart(props) {
    
    const [totalJobSeeker, setTotalJobSeeker] = useState(70);
    const [totalJobProvider, setTotalJobProvider] = useState(30);
    const Data = [
       
        [props.item1, props.item1data],
        [props.item2, props.item2data],
    ];

    return (
        <div style={{
        display: 'block', width: 700, paddingLeft: 30
        }}>
        <h4>Users</h4>
        <PieChart name="PieChart" data={Data} />
        </div >
    );
}