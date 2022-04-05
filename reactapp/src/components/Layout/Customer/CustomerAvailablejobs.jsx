import React, { useContext, useEffect } from "react";
import JobProviderContext from "../../../store/Customer/JobProviderContext";
import ContentContainer from "../../UI/ContentContainer";
import Loading from "../../UI/Loading";
import Card from "../../UI/Card";
import Availablejobs from "./Availablejobs";
import Customersearchform from "./Customersearchform";

function CustomerAvailablejobs() {
  const Context = useContext(JobProviderContext);
  const getavilablejobs = Context.getJobs;
  useEffect(() => {
    getavilablejobs();
  }, [getavilablejobs]);
  return (
    <ContentContainer>
      <Customersearchform />
      {Context.isLoading && <Loading />}
      {Context.availablejobs.map((item,index) => (
        <Availablejobs
          key={index}
          Id={item.jobId}
          job_discription={item.jobDescription}
          wage_for_day={item.wagePerDay}
          from_date={item.fromDate.split(' ')[0]}
          to_date={item.toDate.split(' ')[0]}
          job_location={item.jobLocation}
          phone_number={item.phone}
        />
      ))}
    </ContentContainer>
  );
}

export default CustomerAvailablejobs;
