import { Dropdown, Row } from "react-bootstrap";
import PersonIcon from "../../asserts/PersonIcon";
import {useNavigate } from "react-router-dom"
import { useContext } from "react";
import LoginContext from "../../store/LoginContext";


const Profile = (props) => {
  const navigate=useNavigate();
  const Context=useContext(LoginContext)
  console.log(Context.userData);
  const Logout=()=>{
    Context.isAuthendicated=false;
    navigate("/user/login");
  }
  return (
    <Row>
      <Dropdown>
        <Dropdown.Toggle  id="dropdown-basic">
         
        {PersonIcon}{localStorage.getItem('uname')}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
};
export default Profile;
