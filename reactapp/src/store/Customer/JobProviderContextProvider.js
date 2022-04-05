import React, { useState, useCallback} from "react";
import JobProviderContext from "./JobProviderContext";
import { Variable } from "../../Variable";
import {  useNavigate } from "react-router-dom";



const JobProviderContextProvider = (props) => {
  const navigate=useNavigate();
  const [AvailableJobs, setAvailableJobs] = useState([]);
  const[myJobs,setmyJobs]=useState([]);
  const [AppliedCandidates, setAppliedCandidates] = useState([]);
  const [IsLoading, setisLoading] = useState(false);
  async function SearchJobs(data) {
    let res = await fetch(Variable.API_URL + "jobseeker/search?location=" + data,{
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-type': 'application/json'
      },
    });
    res = await res.json();
    setAvailableJobs(res);
}
  const Getjobs = useCallback(async () => {
    try {
      setisLoading(true);
      const response = await fetch(Variable.API_URL + "user/dashboard");
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      setAvailableJobs(data);
    } catch (error) {
      alert(error.message);
    }
    setisLoading(false);
  }, []);
 async function PostNewJob  (data) {
    var a = data;
    setisLoading(true);
    try {
      const response = await fetch(Variable.API_URL + "admin/addJob/" + localStorage.getItem('id'), {
        method: "Post",
        body: JSON.stringify(a),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      alert(data);  
      navigate("viewAppliedCandidates");
    } catch (error) {
      alert(error.message);
    }   
  
  }
  async function OpeningDeleteHandler  (id) {
    try {
      const response = await fetch(Variable.API_URL + "admin/deleteJob/" + id, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      alert(data);  
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }   
  }
  const GetMyJobs = useCallback( async(id)=> {
    try {
      setisLoading(true);
      const response = await fetch(Variable.API_URL + `jobprovider/myJobs/${id}`);
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      setmyJobs(data)
     
    } catch (error) {
     alert(error.message);
    }
    setisLoading(false);
  },[]);
  async function GetCandidates(id) {
    setisLoading(true);
    console.log(id[0],localStorage.getItem('id'))
    try {
      const response = await fetch(Variable.API_URL + `jobprovider/appliedCandidates?jobProviderId=` + localStorage.getItem('id') + `&jobId=`+ id[0]);
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      setAppliedCandidates(data);   
     
    } catch (error) {
      alert(error.message);
    }
    setisLoading(false);
  }
  async function Search(data) {
    setisLoading(true);
    let res = await fetch(Variable.API_URL + "jobseeker/search?location=" + data,{
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-type': 'application/json'
      },
    });
    res = await res.json();
    setAvailableJobs(res);
    setisLoading(false);
  }

  return (
    <JobProviderContext.Provider
      value={{
        isLoading: IsLoading,
        myJobs:myJobs,
        jobId:[],
        availablejobs: AvailableJobs,
        appliedCandidates: AppliedCandidates,
        getJobs: Getjobs,
        addNewJobs: PostNewJob,
        getMyJobs:GetMyJobs,
        getCandidates:GetCandidates,
        search:Search,
        deleteJob:OpeningDeleteHandler
      }}
    >
      {props.children}
    </JobProviderContext.Provider>
  );
};
export default JobProviderContextProvider;
