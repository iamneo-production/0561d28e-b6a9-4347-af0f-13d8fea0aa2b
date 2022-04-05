import React, { useState, useEffect } from "react";
import JobSeekerContext from "./JobSeekerContext";
import axios from "axios";
import { Variable } from "../../Variable";

function JobSeekerContextProvider(props) {
    const[Appliedjobs,setAppliedjob]=useState([]);
    const[Available_jobs,setAvailable_jobs]=useState([]);
    const [IsLoading, setisLoading] = useState(false);
    async function AddAppliyedJob(data, id){
      let res = await fetch(Variable.API_URL + `jobSeeker/applyJob/${id}` ,{
        method: 'POST',
        body:JSON.stringify(data),
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },

      });
      updateProfile(data);
      res = await res.json();
      alert(res);
    }
    async function updateProfile(data){
      let res = await fetch(Variable.API_URL+'admin/editProfile', {
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      res = await res.json();
    }
    const UseGetJobs = () => {
     
      useEffect(() => {
        setisLoading(true);
        axios
          .get(Variable.API_URL+'user/dashboard')
          .then(res => {
            //
            setAvailable_jobs(res.data)
            setisLoading(false);
          })
          .catch(err => {
            console.log(err)
          })
      }, []);
     
    }
    const useGetAppliedJobs = () => {
      useEffect(() => {
        axios
          .get(Variable.API_URL+'jobseeker/getAppliedJobs?jobSeekerId=' + localStorage.getItem('id'))
          .then(res => {
            //
            setAppliedjob(res.data)
  
          })
          .catch(err => {
            console.log(err)
          })
      }, []);
    }
    async function SearchJobs(data) {
        let res = await fetch(Variable.API_URL + "jobseeker/search?location=" + data,{
          method: 'GET',
          headers: {
            'Accept':'application/json',
            'Content-type': 'application/json'
          },
        });
        res = await res.json();
        setAvailable_jobs(res);
    }
    
  return (
    <JobSeekerContext.Provider value={{ 
      getJobs: UseGetJobs,
      getAppliedJobs: useGetAppliedJobs,
      Appliedjobs: Appliedjobs, 
      Availablejobs: Available_jobs,
      applyJob:AddAppliyedJob, 
      search:SearchJobs,
      isLoading:IsLoading
      }}>
      {props.children}
    </JobSeekerContext.Provider>
  );
}

export default JobSeekerContextProvider;
