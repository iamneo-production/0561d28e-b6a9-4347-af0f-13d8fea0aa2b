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
        .get('https://localhost:44375/admin/getCandidates')
        .then(res => {
          //
          setCandidates(res.data);

        })
        .catch(err => {
          console.log(err)
        })
    }, []);
  }
  const useGetJobs = () => {
    useEffect(() => {
      axios
        .get('https://localhost:44375/admin/getAllJobs')
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
      .get('https://localhost:44375/admin/getJobProvider')
        .then(res => {
          //
          setJobproviders(res.data)
          //console.log(res.data)

        })
        .catch(err => {
          console.log(err)
        })
    }, []);
  }
  const useGetJobSeekers = () => {
    useEffect(() => {
      axios
        .get('https://localhost:44375/admin/getJobSeeker')
        .then(res => {
          //
          setJobseeker(res.data)

        })
        .catch(err => {
          console.log(err)
        })
    }, []);
  }
  const CandidateDeleteHandler = (id) => {
    let res;
    fetch(Variable.API_URL + 'admin/deleteCandidate/' + id,{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
      }).then(res => res.json()).then((data)=>{   
        res = data.data;  
    });
    alert(res);
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
      window.location.reload();
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
    console.log(data)
    let res = await fetch('https://localhost:44375/admin/editUser/' + id,{
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
    let res = await fetch('https://localhost:44375/admin/deleteUser/' + id,{
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
