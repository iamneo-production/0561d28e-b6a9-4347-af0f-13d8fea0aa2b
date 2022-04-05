import { useEffect } from "react";
import axios from "axios";
import { Variable } from "../Variable";
export async function PostLoginData(payload) {
    let admin, user, userrole;
    const IsAdmin = (payload) => {
      fetch(Variable.API_URL+'admin/login',{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json()).then((data)=>{   
        admin = data;  
      });
      if(admin == "-1")
      {
        admin = true;
      }
      else
      {
        admin = false;
      }
    }
    const IsUser = (payload) => {
      fetch(Variable.API_URL+'user/login',{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json()).then((data)=>{   
        admin = data;  
      });
      if(user[1] == "Job Seeker")
      {
        userrole = "jobseeker";
      }
      else if(user[1] == "Job Provider")
      {
        userrole = "jobprovider";
      }
      else
      {
        userrole = "nil";
      }
    }
    IsAdmin(payload);
    if(!admin)
    {
      IsUser(payload);
    }
    /*await fetch('Variable.API_URL+'admin/login',{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json()).then((data)=>{   
        admin = data;  
      });*/
      if(!admin)
      {
        /*await fetch('Variable.API_URL+'user/login',{
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).then(res => res.json()).then((data)=>{   
          user = data;
        });*/
      }
      if(admin){
        userrole = "admin";
        return userrole;
      }
      else if(user[1] === "Job Provider")
      {
        userrole = "jobprovider";
        return userrole;
      }
      else if(user[1] === "Job Seeker")
      {
        userrole = "jobseeker";
        return userrole;
      }
      else
      {
        alert('Invalid email and password!');
      }
  }