import React, { useContext } from "react";
import classes from "./Jobseekernavigation.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import Profile from '../../UI/Profile';
import LoginContext from "../../../store/LoginContext";

export default function Jobseekernavigation(props) {
  const navigator=useNavigate();
  const context = useContext(LoginContext);


  return (
    <header className={classes.header}>
    <div className={classes.logo} style={{fontFamily: 'Courier New'}}>Cooking Expert</div> 
      
        <nav className={classes.nav}>
    <ul>
      <li>
        <NavLink  to="dashboard" id="userHomeButton" className={navData => navData.isActive ? classes.active : '' }>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="appliedjobs" id="userAppliedJobs" className={navData => navData.isActive ? classes.active : '' }>
        Applied jobs
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
