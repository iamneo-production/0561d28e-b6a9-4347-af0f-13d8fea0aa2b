import { useNavigate } from 'react-router-dom';
import Delete from '../../../asserts/Delete';
import Edit from '../../../asserts/Edit';
import { useContext } from 'react';
import AdminContext from '../../../store/Admin/AdminContext';
const TableRow = (props) => {
    const Context = useContext(AdminContext);
    const Navigate = useNavigate();
    const onEditUser = () => {
        Context.userEditdata = {...props.item,name:props.name};
        console.log(props.item);
        Navigate(`/admin/editUser/${props.id}`);
    }
    const OnDelete = (id) => {
        Context.deleteUser(id);
    }
    return <tr>
        <th scope="row">{props.index + 1}</th>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.phone_number}</td>
        <td><button className='btn' onClick={onEditUser}>{Edit}</button></td>
        <td><button className='btn' onClick={event => OnDelete(props.id)}>{Delete}</button></td>
    </tr>
}
export default TableRow;