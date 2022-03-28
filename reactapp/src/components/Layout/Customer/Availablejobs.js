import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Card from '../../UI/Card';
import classes from "./Availablejobs.module.css";
import {useTransition, animated } from 'react-spring';

function Availablejobs(props) {
  const transition = useTransition(true, {
    from: {x: -100, y: 800, opacity: 0, delay: 2},
    enter: {x: 0, y:0, opacity: 1},
    leave: {x: 100, y: 800, opacity: 0 },
  });
  return(   
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
                  <td>Phone Number :</td>
                  <td>{props.phone_number}</td>
                </tr>
              
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default Availablejobs;
