import React, { useContext } from "react";
import TableRow from "./TableRow";

import AdminContext from "../../../store/Admin/AdminContext";
function JobProviderTable() {

    const Context = useContext(AdminContext);

    return (
        <table className="table bg-light rounded" style={{ fontFamily: 'Courier-New' }}>
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {Context.getJobProviders()}
                {Context.jobProviders.map((item, index) => (
                    <TableRow
                        key={item.id}
                        id={item.id}
                        item={item}
                        name={item.name}
                        email={item.email}
                        phone_number={item.mobileNumber}
                        index={index}

                    />
                ))}
            </tbody>
        </table>
    );
}

export default JobProviderTable;
