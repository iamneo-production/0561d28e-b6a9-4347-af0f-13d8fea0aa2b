import React from 'react';
import { Routes ,Route} from "react-router-dom";
import Customeraddjob from '../components/Layout/Customer/Customeraddjob';
import CustomerAvailablejobs from '../components/Layout/Customer/CustomerAvailablejobs';
import Customernavigation from '../components/Layout/Customer/Customernavigation';
import CustomerAppliedCandidates from '../components/Layout/Customer/CustomerAppliedCandidates';
import JobProviderContextProvider from '../store/Customer/JobProviderContextProvider';

function Customerdashboard(props) {
  return <JobProviderContextProvider>
    <Customernavigation/>
      <Routes>
      <Route path='dashboard' element={<CustomerAvailablejobs/>}/>
      <Route path='addjob' element={<Customeraddjob/>}/>
      <Route path='viewAppliedCandidates' element={<CustomerAppliedCandidates/>}/>
      </Routes>
      </JobProviderContextProvider>;
}

export default Customerdashboard;
