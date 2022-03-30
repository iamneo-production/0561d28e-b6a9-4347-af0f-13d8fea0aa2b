import React from 'react';

const JobSeekerContext=React.createContext({
    isLoading:false,
    Appliedjobs:[],
    Availablejobs:[],
    getJobs:()=>{},
    getAppliedJobs:()=>{},
    applyJob:()=>{},
    search:()=>{},

})
export default JobSeekerContext;
