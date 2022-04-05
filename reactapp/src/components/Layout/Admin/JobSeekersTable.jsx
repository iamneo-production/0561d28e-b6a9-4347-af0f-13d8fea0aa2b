import React from 'react';
import { useContext } from "react";
import AdminContext from '../../../store/Admin/AdminContext';
import TableRow from './TableRow';
function JobSeekersTable() {
    const Context = useContext(AdminContext);
    return (
        <table className="table bg-white rounded" style={{ fontFamily: 'Courier-New' }}>
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {Context.getJobSeekers()}
                {Context.jobSeekers.map((item, index) => <TableRow key={index}
                    item={item}
                    name={item.username}
                    id={item.id}
                    phone_number={item.mobileNumber}
                    index={index}
                    email={item.email} />)}
            </tbody>
        </table>

    );
}

export default JobSeekersTable;