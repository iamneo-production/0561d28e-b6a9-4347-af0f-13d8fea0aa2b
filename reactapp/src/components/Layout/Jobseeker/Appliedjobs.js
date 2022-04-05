import React from "react";
import { Container, Row, Col,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./Appliedjobs.module.css"
import Card from "../../UI/Card";

export default function Appliedjobs(props) {
  const navigate=useNavigate();
  const check = (val) => {
    if(val === '0'||val === 0)
    {
      return <div className="bg-primary text-white text-center">Waiting</div>
    }
    else if(val === '1'||val === 1)
    {
      return <div className="bg-success text-white text-center">Accepted</div>
    }
    else if(val === '2'||val === 2)
    {
      return <div className="bg-danger text-white text-center">Rejected</div>
    }
    else
    {
      return <div className="bg-secondary text-white text-center">Job Deleted</div>
    }
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
                  <td>Job Location :</td>
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
                  <td>phone :</td>
                  <td>{props.phone_number}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className=" p-2 ">
          <Col >{check(props.isAvailable)}</Col>
        </Row>
      </Container>
    </Card>
  );
}
