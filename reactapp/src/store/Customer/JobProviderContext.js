import React from "react"

 const JobProviderContext = React.createContext({
     isLoading:false,
     myJobs:[],
     jobId:[],
     availablejobs:[],
     appliedCandidates:[],
     getJobs:()=>{},
     addNewJobs:()=>{},
     getMyJobs:()=>{},
     getCandidates:()=>{},
     Searchjob:()=>{},
 }) 
 export default JobProviderContext;