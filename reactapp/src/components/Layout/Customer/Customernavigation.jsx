import React from "react";
import { Button } from "react-bootstrap";
import { NavLink,useNavigate} from "react-router-dom";
import Profile from "../../UI/Profile";
import classes from "./Customernavigation.module.css"


function Customernavigation(props) {
    const navigator=useNavigate();
    const onLogout=()=>{
        navigator('/user/login');
    }
  
    return (
      <header className={classes.header}>
        <div className={classes.logo} style={{fontFamily: 'Courier New'}}>Cooking Expert</div> 
          
            <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink  id="userHomeButton" to="dashboard" className={navData => navData.isActive ? classes.active : '' }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink id="userAddOpenings" to="addjob" className={navData => navData.isActive ? classes.active : '' }>
              Add Openings
            </NavLink>
          </li>
           <li>
            <NavLink id="userAppliedJobs" to="viewAppliedCandidates" className={navData => navData.isActive ? classes.active : '' }>
              Applied Candidates
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="text-center">
            <Profile />
        </div >

      </header>
    );
}

export default Customernavigation;
