import React, {  useContext } from "react";
import JobSeekerContext from "../../../store/jobseeker/JobSeekerContext";
import ContentContainer from "../../UI/ContentContainer";
import Loading from "../../UI/Loading";
import AvailableJobs from "./AvailableJobs";
import Jobseekerform from "./Jobseekerform";

export default function JobseekerAvailablejobs(props) {
  const Context=useContext(JobSeekerContext);
  //console.log(Context.Availablejobs);
  return (
    <ContentContainer>     
      <Jobseekerform />
      {Context.isLoading && <Loading />}
      {Context.getJobs()}
      {Context.Availablejobs.map((item) => 
        <AvailableJobs
          key={item.jobId}
          Id={item.jobId}
          job_discription={item.jobDescription}
          wage_for_day={item.wagePerDay}
          from_date={item.fromDate.split(' ')[0]}
          to_date={item.toDate.split(' ')[0]}
          job_location={item.jobLocation}
          phone_number={item.phone}
          
        />
      )}
     
     </ContentContainer>

  );
}
