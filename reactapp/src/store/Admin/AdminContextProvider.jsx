import { useState, useEffect } from "react";
import axios from "axios";
import AdminContext from "./AdminContext";
import { PostUserData } from '../../Server/PostUserData';
import { Variable } from "../../Variable";
const AdminContextProvider = (props) => {
  let [Candidates, setCandidates] = useState([]);
  let [Jobproviders, setJobproviders] = useState([]);
  let [Jobseekers, setJobseeker] = useState([]);
  const [Openings, setOpenings] = useState([]);
  
  const GetCandidates = () => {
    useEffect(() => {
      axios
        .get(Variable.API_URL+'admin/getCandidates')
        .then(res => {
          //
          setCandidates(res.data);
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },[]);
  }
  const useGetJobs = () => {
    useEffect(() => {
      axios
        .get(Variable.API_URL+'admin/getAllJobs')
        .then(res => {
          //
          setOpenings(res.data)

        })
        .catch(err => {
          console.log(err)
        })
    }, []);
  }
  const useGetJobProviders = () => {
    useEffect(() => {
      axios
      .get(Variable.API_URL+'admin/getJobProvider')
        .then(res => {
          //
          setJobproviders(res.data)
         
        })
        .catch(err => {
          console.log(err)
        })
    }, []);
  }
  const useGetJobSeekers = () => {
    useEffect(() => {
      axios
        .get(Variable.API_URL+'admin/getJobSeeker')
        .then(res => {
          //
          setJobseeker(res.data)

        })
        .catch(err => {
          console.log(err)
        })
    }, []);
  }
 async function CandidateDeleteHandler (id) {
    let res= await fetch(Variable.API_URL + 'admin/deleteCandidate/' + id,{
        method: 'DELETE',
      })
      const data=await res.json();
      alert(data);
      setCandidates(
        Candidates.filter((item) => {
          return item.id !== id;
        })
      ); 
  };
  const CandidateEditHandeler = (data) => {
    let res;
    fetch(Variable.API_URL + 'admin/editProfile',{
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json()).then((data)=>{   
        res = data;  
        alert(res);
    });
  };
  /*async function OpeningDeleteHandler(id) {
    let res;
    await fetch(Variable.API_URL + 'admin/deleteJob/' + id,{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
      });
    res = await res.json();
    console.log(res.stringify());
    alert(res);
    window.location.reload();
  };*/
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
      setOpenings(
      Openings.filter((item) => {
          return item.id !== id;
        })
      );
    } catch (error) {
      alert(error.message);
    }   
  }

  const openingEditHandler = (id, data) => {
    let res;
    fetch(Variable.API_URL + 'admin/editJob/' + id,{
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json()).then((data)=>{   
        res = data;  
        alert(res);
    });
  };
  async function userEdit(data, id)
  {
  console.log(id,data);
    let res = await fetch(Variable.API_URL+'admin/editUser/' + id,{
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      res = await res.json();
      alert(res);
  }
  async function deleteUser( id)
  {
    let res = await fetch(Variable.API_URL+'admin/deleteUser/' + id,{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
      });
      res = await res.json();
      window.location.reload();
      alert(res);
  }
  const UserEditHander = (data, id) => {
    userEdit(data, id);
    console.log(id);
  }
  const DeleteUserData=(id)=>{
    deleteUser(id);
  }
  const AddnewUser=(data)=>{
    if(PostUserData(data))
    {
      alert("User added successfully");
    }
    else
    {
      alert("Error occured..!")
    }
  }


  return (
    <AdminContext.Provider
      value={{
        getJobs: useGetJobs,
        getCandidates: GetCandidates,
        getJobSeekers: useGetJobSeekers,
        getJobProviders: useGetJobProviders,
        openings: Openings,
        candidates: Candidates,
        candidateEditData: {},
        openingEditData: {},
        userEditData: {},
        jobSeekers: Jobseekers,
        jobProviders: Jobproviders,
        openingDelete: OpeningDeleteHandler,
        openingEdit: openingEditHandler,
        candidateDelete: CandidateDeleteHandler,
        candidateEdit: CandidateEditHandeler,
        addNewUser:  AddnewUser,
        editUser: UserEditHander ,
        deleteUser:  DeleteUserData,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
