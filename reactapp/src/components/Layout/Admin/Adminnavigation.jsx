import React from "react";
import { NavLink } from "react-router-dom";
import Profile from "../../UI/Profile";
import classes from "./Adminnavigation.module.css"

function Adminnavigation( props) {
   
   
  
    return (
      <header className={classes.header}>
      <div className={classes.logo}>Cooking Expert</div> 
        
          <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink id="Users" to="Users/jobproviderData" className={navData => navData.isActive ? classes.active : '' }>
          Users
          </NavLink>
        </li>
        <li>
          <NavLink  id="AdminOpenings" to="getAllJobs" className={navData => navData.isActive ? classes.active : '' }>
            Openings
          </NavLink>
        </li>
         <li>
          <NavLink id="AdminCandidates" to="profile" className={navData => navData.isActive ? classes.active : '' }>
           Candidates
          </NavLink>
        </li>
       
      </ul>
    </nav>
    <div className="text-center">
    <Profile/>
      </div >

    </header>
   
    );
}

export default Adminnavigation;
