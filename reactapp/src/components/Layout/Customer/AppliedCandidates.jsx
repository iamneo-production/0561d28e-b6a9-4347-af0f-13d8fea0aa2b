import Card from "../../UI/Card";
import { Col, Row, Button } from "react-bootstrap";
import classes from "./AppliedCandidates.module.css";
import React, { useContext, useEffect, useState } from 'react';
import JobProviderContext from "../../../store/Customer/JobProviderContext";
import { Variable } from "../../../Variable";
import axios from 'axios';

function AppliedCandidates(props) {
  let [res, setRes] = useState();
  const Accept = (id, jobId) =>
  {
    let res;
    fetch(Variable.API_URL + 'jobprovider/acceptjobseeker/' + id + ',' + jobId,{
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
      }).then(res => res.json()).then((data)=>{   
        res = data;  
        console.log(res);
    });
    window.location.reload();
  }
  const Reject = (id, jobId) =>
  {
    let res;
    fetch(Variable.API_URL + 'jobprovider/rejectjobseeker/' + id + ',' + jobId,{
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
      }).then(res => res.json()).then((data)=>{   
        res = data;  
        console.log(res);
    });
    window.location.reload();
  }
  const Check = () =>
  {
    let isCancelled = false;
    useEffect(() => {
      axios
        .get('https://localhost:44375/jobprovider/job/checkCandidate/' + props.Id + "," + localStorage.getItem('jobId'))
        .then(res => {
          if(!isCancelled)
            setRes(res.data);
        })
        .catch(err => {
          console.log(err)
        });
        return () => {
          isCancelled = true
        };
    });
    console.log(res);
  
    if(res === "0")
    {
      return <Col className="d-flex justify-content-d-flex justify-content-around">
      <Button id="chatButton" onClick={event => Accept(props.Id, localStorage.getItem('jobId'))}>accept</Button>
      <Button id="chatButton" onClick={event => Reject(props.Id, localStorage.getItem('jobId'))}>Decline</Button>
      </Col>
    }
    else if(res === "1")
    {
      return <Row><div className="bg-success text-white text-center" style={{width: '40%', marginLeft: '30%', borderRadius: '50px'}}>Accepted</div></Row>
    }
    else
    {
      return <Row><div className="bg-danger text-white text-center" style={{width: '40%', marginLeft: '30%', borderRadius: '50px'}}>Rejected</div></Row>
    }
  }

  return (
    <Card>
<Row>
  <Col>
    <table className={classes.table}>
      <tbody>
        <tr className="textcenter">
          <td>Candidate Name :</td>
          <td>{props.name}</td>
        </tr>
        <tr>
          <td>Phone Number :</td>
          <td>{props.phone_number}</td>
        </tr>
        <tr>
          <td>Year of Experience :</td>
          <td>{props.yearOfExperience}</td>
        </tr>
      </tbody>
    </table>
  </Col>
  <Col>
    <table className={classes.table}>
      <tbody>
        <tr>
          <td>Address :</td>

          <td>{props.address}</td>
        </tr>
        <tr>
          <td>Email :</td>
          <td>{props.email}</td>
        </tr>
      </tbody>
    </table>
    
  </Col>
</Row>
{Check()}

</Card>
  )
}

export default AppliedCandidates;
