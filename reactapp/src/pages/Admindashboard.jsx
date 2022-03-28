import React from 'react';
import { Routes ,Route} from "react-router-dom";
import Admincandidates from '../components/Layout/Admin/Admincandidates';
import Admineditcandidates from '../components/Layout/Admin/Admineditcandidates';
import Admineditopenings from '../components/Layout/Admin/Admineditopenings';
import Adminnavigation from '../components/Layout/Admin/Adminnavigation';
import AdminOpenings from '../components/Layout/Admin/AdminOpenings';
import EditUser from '../components/Layout/Admin/EditUser';
import Users from '../components/Layout/Admin/Users';
import AdminContextProvider from '../store/Admin/AdminContextProvider';
function Admindashboard(props) {
  return(
    <AdminContextProvider >
    <Adminnavigation/>
      <Routes>
      <Route path='getAllJobs' element={<AdminOpenings/>}/>
      <Route path='profile' element={<Admincandidates/>}/>
      <Route path='editprofile/:id' element={<Admineditcandidates/>}/>
      <Route path='editjob/:id' element={<Admineditopenings/>}/>
      <Route path='editUser/:id' element={<EditUser/>}/>
      <Route path='Users/*' element={<Users/>}/>
      </Routes>
    </AdminContextProvider>
   );
}
 
export default Admindashboard;
