import React, { useContext, useRef, useState } from "react";
import {  Col, Row, Form, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../../UI/ContentContainer";
import JobSeekerContext from "../../../store/jobseeker/JobSeekerContext";
import { Variable } from "../../../Variable";

export default function Jobseekerapplyjob(props) {
  const [isError, setIsError] = useState(false);
  const Context = useContext(JobSeekerContext);
  const Name = useRef();
  const Email = useRef();
  const Phone = useRef();
  const Address = useRef();
  const YearOfExperience = useRef();
  const [isNameValid,setisNameValid]=useState();
  const[isEmailValid,setisEmailValid]=useState();
  const [isPhoneValid,setisPhoneValid]=useState();
  const [isAddressValid,setisAddressValid]=useState();
   const { id } = useParams();
  const navigator = useNavigate();
  const ValidateName = () => {
    setisNameValid(
      Name.current.value !== "" 
    );
  };
  const ValidateAddress = () => {
    setisAddressValid(
      Address.current.value !== "" 
    );
  };
  const ValidateEmail = () => {
    setisEmailValid(
      Email.current.value !== "" && Email.current.value.includes("@")
    );
  };
  const ValidatePhone = () => {
    setisPhoneValid(Phone.current.value.match(/^\d{10}$/) ? true : false);
  };
  const onApply = (event) => {
    event.preventDefault();
    setIsError(false);
    if (
      !(
        Name.current.value &&
        Phone.current.value &&
        Address.current.value &&
        YearOfExperience.current.value &&
        Email.current.value
      )
    ) {
      setIsError(true);
      return;
    }
    var data = {
      personId: localStorage.getItem('id'),
      personName: Name.current.value,
      personAddress: Address.current.value,
      personExp: YearOfExperience.current.value,
      personPhone: Phone.current.value,
      email: Email.current.value
    }
    //console.log(data);
    /*if()
    {
      Context.applyJob(data, id);
      navigator(-1);
    }
    else
    {
      alert("Job already applied");
      navigator(-1);
    }*/
    console.log(data,id);
    let res;
    alreadyApplied(data);
    async function alreadyApplied(data) 
    {
      res = await fetch(Variable.API_URL + "jobseeker/job/alreadyApplied?jsId=" + localStorage.getItem('id') + "&jId=" + id,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept":"application/json"
        }
      });
      res = await res.json();
      if(!res)
      {
        Context.applyJob(data, id);
        
        navigator(-1);
      }
      else
      {
        alert("Job already applied");
        navigator(-1);
      }
    }
  };
  const onCancel = () => {
    navigator(-1);
  };
  return (
      <ContentContainer  >
        <form onSubmit={onApply} className="m-4 bg-light p-3 rounded ">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  ref={Name}
                  onBlur={ValidateName}
                  id="enter Name"
                  type="text"
                  placeholder="Enter your name"
                  //defaultValue={formData.phone_number}
                />
                {isNameValid===false&&(<p style={{color:"red"}}>Name cannot be nothing</p>)}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  ref={Phone}
                  onBlur={ValidatePhone}
                  id="enter Phone Number"
                  type="tel"
                  placeholder="Enter number"
                  //defaultValue={formData.phone_number}
                />
                 {isPhoneValid === false && (
                <p style={{ color: "red" }}>Invalid phone number</p>
              )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year of experience</Form.Label>
                <Form.Control
                  ref={YearOfExperience}
                  id="enterYearOfExperience"
                  type="number"
                 
                  min='1'
                  max='20'
                  placeholder="Enter your year of experience "
                  //defaultValue={formData.phone_number}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  ref={Address}
                  onBlur={ValidateAddress}
                  id="enterAddress"
                  type="text"
                  placeholder="Enter Address"
                  //defaultValue={formData.phone_number}
                />
                 {isAddressValid===false&&(<p style={{color:"red"}}>Address cannot be nothing</p>)}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  ref={Email}
                  onBlur={ValidateEmail}
                  id="enterEmail"
                  type="email"
                  placeholder="Enter email"
                  //defaultValue={formData.phone_number}
                />
                 {isEmailValid === false && (
                <p style={{ color: "red" }}>Invalid email</p>
              )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {isError && (
              <div className="alert alert-danger alert-dismissible fade show m-3">
                Please fill all the input feilds
              </div>
            )}
            <Col className="text-center">
              <Button onClick={onCancel} variant="danger">
                Cancel
              </Button>
            </Col>{" "}
            <Col className="text-center">
              <Button id="applyButton" type="submit" variant="success">
                Apply job
              </Button>{" "}
            </Col>{" "}
          </Row>
        </form>
      </ContentContainer>
   
  );
}
