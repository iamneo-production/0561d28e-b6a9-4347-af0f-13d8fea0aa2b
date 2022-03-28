import React ,{useContext} from 'react';
import Openings from './Openings';
import AdminContext from '../../../store/Admin/AdminContext';
import ContentContainer from '../../UI/ContentContainer';

function AdminOpenings(props) {
  const Context=useContext(AdminContext);
  return (
    <ContentContainer style={{width:"100%",height:" 85vh ",overflowY:"scroll"}}>
      { Context.getJobs() }
      {Context.openings.map((item) => 
        <Openings
          key={item.jobId}
          id={item.jobId}
          job_discription={item.jobDescription}
          wage_for_day={item.wagePerDay}
          from_date={item.fromDate}
          to_date={item.toDate}
          job_location={item.jobLocation}
          phone_number={item.phone}
        />
      )}   
    </ContentContainer>
  );
}

export default AdminOpenings;
