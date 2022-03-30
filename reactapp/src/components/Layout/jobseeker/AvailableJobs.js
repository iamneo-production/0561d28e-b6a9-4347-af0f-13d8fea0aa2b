import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./Availablejobs.module.css";
import Card from "../../UI/Card";


export default function AvailableJobs(props) {
  const navigate=useNavigate();
  const onApply=()=>{
    navigate(`/jobseeker/applyjob/${props.Id}`);
  }
  return (
    <Card>
      <Container fluid>
        <Row>
          <Col>
          <table className={classes.table}>
              <tbody>
                <tr>
                  <td>Job Description :</td>
                  <td>{props.job_discription}</td>
                </tr>
                <tr>
                  <td>From Date :</td>
                  <td>{props.from_date}</td>
                </tr>
                <tr>
                  <td>Location :</td>
                  <td>{props.job_location}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col  >
            <table className={classes.table}> 
              <tbody>
                <tr>
                  <td>Wage Per Day :</td>
                  <td>{props.wage_for_day}</td>
                </tr>
                <tr>
                  <td>To Date :</td>
                  <td>{props.to_date}</td>
                </tr>
                <tr>
                  <td>Phone :</td>
                  <td>{props.phone_number}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className=" p-2 ">
         
        <Col> <Button variant="info" onClick={onApply}>Apply job</Button></Col>
          
        </Row>
      </Container>
    </Card>
  );
}
