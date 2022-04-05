import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DeleteIcon from "../../../asserts/DeleteIcon";
import JobProviderContext from "../../../store/Customer/JobProviderContext";
import Card from "../../UI/Card";
import AppliedCandidates from "./AppliedCandidates";
import MyJobs from "./Myjobs";

function CustomerAppliedCandidates(props) {
  const [isgetcandidates, setisgetcandidates] = useState(false);
  const [jobdata, setjobdata] = useState()
  const Context = useContext(JobProviderContext);
 function setisgetcandidateshandeler(id) {
    const job = Context.myJobs.filter((item) => {
      return item.jobId === id[0];
    })
    setjobdata(job);
    setisgetcandidates(true);
  }
  return (
    < Container fluid >
      <Row >
        <Col sm={4} className="h-100">
          <MyJobs setisgetcandidates={setisgetcandidateshandeler} />
        </Col>
        {isgetcandidates && <Col
          sm={8}
          style={{ height: "85vh ", overflowY: "scroll", overflowX: "hidden" }}
        ><Card ><Row><Col>Phone :{jobdata[0].mobileNumber}</Col><Col>Wage per day: Rs.{jobdata[0].wagePerDay}</Col></Row>
            <Row><Col>Location :{jobdata[0].jobLocation}</Col><Col className="text-center"><button className="btn btn-primary" onClick={event => Context.deleteJob(jobdata[0].jobId)}>{DeleteIcon}</button></Col></Row>
          </Card>
  
          {!Context.appliedCandidates[0] && <Card><h4>No candidates Applied</h4></Card>}
          {Context.appliedCandidates.map((item, index) => (
            <AppliedCandidates
              key={index}
              Id={item.id}
              name={item.name}
              address={item.address}
              phone_number={item.phone}
              yearOfExperience={item.experience}
              email={item.email}
            // id={`adminsCandidatesGrid${props.id}`}
            />
          ))}
        </Col>}
      </Row>
    </Container>
  );
}

export default CustomerAppliedCandidates;
