import React, { useRef,useState,useContext } from 'react';
import {Form,Row,Col,Button} from "react-bootstrap";
import ContentContainer from '../../UI/ContentContainer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import JobProviderContext from '../../../store/Customer/JobProviderContext';
import { useNavigate } from 'react-router-dom';
import './customeraddjob.css';

 
function Customeraddjob() {
  const Context=useContext(JobProviderContext);
  const navigate=useNavigate();
  const [Ermsg,setErrmsg]=useState(false)
  const [FromDate, setStartDate] = useState(new Date());
  const [ToDate, setStartToDate] = useState(FromDate);
  
   const JobDiscription= useRef();
   const [WageForDay,setWageForDay]=useState('');
   const [isWageValid,setisWageValid]=useState();
   const JobLocation=useRef();
   const [isDescriptionValid,setisDescriptionValid]=useState()
   const [PhoneNumber,setPhoneNumber]=useState('');
   const [isPhonevalid,setisPhonevalid]=useState();
   const [isLocationValid,setisLocationValid]=useState()
   const OnCancel=()=>{
     navigate("/jobprovider/dashboard");
   }
   const PhoneChangeHandler=(event)=>{
     setPhoneNumber(event.target.value);
  }
  const WageChangeHandler=(event)=>{
    setWageForDay(event.target.value);
 }
   const ValidatePhone=()=>{
    setisPhonevalid( PhoneNumber.match(/^\d{10}$/)?true:false );
  
   }
   const ValidateWage=()=>{
    setisWageValid(WageForDay.match(/^\d[0-9]+$/)?true:false);
   
   }
   const ValidateDescription=()=>{
       setisDescriptionValid(JobDiscription.current.value!=='' )
      
   }
   const ValidateLocation=()=>{
    setisLocationValid(JobLocation.current.value!=='' )
    
}
  
  const OnAddjob=(event)=>{
    event.preventDefault();
    setErrmsg(false)
   let formData={}
   formData.fromDate=FromDate;
   formData.toDate=ToDate;
   formData.wagePerDay=WageForDay
   formData.jobLocation=JobLocation.current.value;
   formData.phoneNumber=PhoneNumber
   formData.jobDescription=JobDiscription.current.value;
   if(!(FromDate && ToDate && formData.wagePerDay &&  formData.jobLocation && formData.phoneNumber && formData.jobDescription))
   {
     setErrmsg(true)
     return;
   }
  var data = {
    jobDescription: formData.jobDescription,
    jobLocation: formData.jobLocation,
    fromDate: formData.fromDate,
    toDate: formData.toDate,
    wagePerDay: formData.wagePerDay,
    mobileNumber: formData.phoneNumber
  }
  console.log(data);

   Context.addNewJobs(data);
  }
   
  return <ContentContainer> 
       <form className="m-4 bg-light p-3 rounded " onSubmit={OnAddjob}>
       

<Row>
  <h3 style={{fontFamily: 'Courier-New'}}>Add Openings</h3>
  <Col>
    <Form.Group className="textBox mb-3">
      <Form.Label>Job Description</Form.Label>
      <Form.Control
        ref={JobDiscription}
        onBlur={ValidateDescription}
        id="JobDiscription"
        type="text"
        placeholder="Enter Job Discription"
      
      />
     {isDescriptionValid===false && <p style={{color:"red"}}>Description cannot be blank</p>} 
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>From Date</Form.Label>
      <DatePicker selected={FromDate}
      minDate={new Date()}
      
      onChange={(date) => {setStartDate(date);  setStartToDate(date);} } />

    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Wage For Day</Form.Label>
      <Form.Control
        onChange={WageChangeHandler}
        onBlur={ValidateWage}
        id="WageForDay"
        type="text"
        placeholder=" Enter Wage For Day"
    
      />
    </Form.Group>
     {isWageValid===false && <p style={{color:"red"}}>Wage must be in numbers</p>}
  </Col>
  <Col>
    <Form.Group className="mb-3">
      <Form.Label>Job Location</Form.Label>
      <Form.Control
        ref={JobLocation}
        onBlur={ValidateLocation}
        id="Location"
        type="text"
        placeholder=" Enter Job Location"
     
      />
    {isLocationValid===false &&  <p style={{color:"red"}}>Location cannot be blank</p>}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>To Date</Form.Label>
      <DatePicker selected={ToDate}
      minDate={FromDate}
     
      onChange={(date) => setStartToDate(date)} />

    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control
       
        onChange={PhoneChangeHandler}
        onBlur={ValidatePhone}
        id="PhoneNumber"
        type="tel"
        pattern='[0-9]{10}'
        placeholder=" Enter Phone Number"
      />
    </Form.Group>
    {isPhonevalid===false && <p style={{color:"red"}}>Invalid phone number</p>}
  </Col>
</Row>
<Row>
{Ermsg && (
              <div className="alert alert-danger alert-dismissible fade show m-3">
                <strong>Error!</strong> Please fill all the feilds
              </div>
            )}
  <Col className="text-center">
    <Button variant="secondary" onClick={OnCancel}>Cancel</Button>
  </Col>
  <Col className="text-center">
    <Button id="applyButton" type="submit" variant="success">
      Add job
    </Button>
  </Col>
</Row>
</form>
</ContentContainer>;
}

export default Customeraddjob;
