import React, { useContext } from 'react';
import JobSeekerContext from '../../../store/jobseeker/JobSeekerContext';
import ContentContainer from '../../UI/ContentContainer';
import Appliedjobs from './Appliedjobs';
function Jobseekerappliedjob() {
   
const Context=useContext(JobSeekerContext);
  return <ContentContainer>
       {Context.getAppliedJobs()}
       {Context.Appliedjobs.map((item, index) => 
        <Appliedjobs
          key={index}
          Id={item.id}
          id={`userGrid${item.id}`}
          job_discription={item.jobDescription}
          wage_for_day={item.wagePerDay}
          from_date={item.fromDate.split(' ')[0]}
          to_date={item.toDate.split(' ')[0]}
          job_location={item.jobLocation}
          phone_number={item.mobileNumber}
          isAvailable={item.selected}
        />
      )}
     

     </ContentContainer>;
}

export default Jobseekerappliedjob;
