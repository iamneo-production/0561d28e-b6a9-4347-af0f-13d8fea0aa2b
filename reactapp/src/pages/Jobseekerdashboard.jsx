import { Routes, Route } from "react-router-dom";
import Jobseekerappliedjob from "../components/Layout/Jobseeker/Jobseekerappliedjob";
import Jobseekerapplyjob from "../components/Layout/Jobseeker/Jobseekerapplyjob";
import JobseekerAvailablejobs from "../components/Layout/Jobseeker/JobseekerAvailablejobs";
import Jobseekernavigation from "../components/Layout/Jobseeker/Jobseekernavigation";
import JobSeekerContextProvider from "../store/jobseeker/JobSeekerContextProvider";
import React from "react";

const Jobseekerdashboard = (props) => {
  return (
    <JobSeekerContextProvider>
      <Jobseekernavigation />
      <Routes>
        <Route path="dashboard" element={<JobseekerAvailablejobs />} />
        <Route path="appliedjobs" element={<Jobseekerappliedjob />} />

        <Route path="applyjob/:id" element={<Jobseekerapplyjob />} />
      </Routes>
    </JobSeekerContextProvider>
  );
};
export default Jobseekerdashboard;
