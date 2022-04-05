import {useContext,useEffect} from "react";
import { Col,  Row } from "react-bootstrap";
import JobProviderContext from '../../../store/Customer/JobProviderContext'

import Card from "../../UI/Card";
const MyJobs = (props) => {
  const Context=useContext(JobProviderContext);
  function getCandidates(id) {
   
    localStorage.setItem('jobId', id);
    props.setisgetcandidates(id);
     Context.getCandidates(id);
    
  }
  
  const getmyjobs=Context.getMyJobs;
  useEffect(() => {
   getmyjobs(localStorage.getItem('id'))
  
  }, [getmyjobs])
  
  return (
    <Card>
      <h2 className="text-center" style={{fontFamily: 'Courier-New'}}>My Jobs</h2>
      {!Context.myJobs[0] && <Card><h4>You didn't post any jobs at the time</h4></Card>}
      {Context.myJobs.map((item)=>(<button key={item.jobId} className="btn btn-primary text-white p-2 m-1" style={{borderRadius: '20px'}} onClick={getCandidates.bind(this,[item.jobId])}>
        <div className="text-center" style={{paddingBottom: '10px'}}>Job Description : {item.jobDescription}</div>
        <Row>
          <Col>From : {item.fromDate.split(' ')[0]} </Col>
          <Col>To : {item.toDate.split(' ')[0]}</Col>
        </Row>
        <div className="border border-0"></div>
      </button>))}
      
    </Card>
);
};
export default MyJobs;
