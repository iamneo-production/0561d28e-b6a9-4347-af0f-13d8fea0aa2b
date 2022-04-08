import React, { useState } from 'react'
import { PieChart } from '@rsuite/charts';

export default function JobChart(props) {
    
    const Data = [
       
        [props.item2, props.item2data],
        [props.item3, props.item3data],
        [props.item4, props.item4data]
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
