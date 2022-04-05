import { Dropdown, Row } from "react-bootstrap";
import PersonIcon from "../../asserts/PersonIcon";
import {useNavigate } from "react-router-dom"
import { useContext } from "react";
import LoginContext from "../../store/LoginContext";


const Profile = (props) => {
  const navigate=useNavigate();
  const Context=useContext(LoginContext)
  const Logout=()=>{
    Context.isAuthendicated=false;
    localStorage.clear();
    navigate("/login");
  }
  return (
    <Row>
      <Dropdown>
        <Dropdown.Toggle  id="dropdown-basic">
         
        {PersonIcon}&nbsp;{localStorage.getItem('uname')}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
          {localStorage.getItem('uname')!=="Admin" &&<Dropdown.Item onClick={()=>navigate('/review')}>Review</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
};
export default Profile;
