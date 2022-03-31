import React, {useRef, useContext } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";

import JobSeekerContext from "../../../store/jobseeker/JobSeekerContext";
import Card from "../../UI/Card";

export default function Jobseekerform(props) {
  const data = useRef();
  const Context=useContext(JobSeekerContext);
  return (<Card>
    <form >
      <Col>
      <Row>
        <Col>
          <Form.Group >
            <Form.Control
              type="text"
              ref={data}
              placeholder="Type here to search for jobs"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="secondary" id="logout" onClick={ event => Context.search(data.current.value) }>
            search
          </Button>
        </Col>
      </Row>
      </Col>
      <Col></Col>
      
    </form></Card>
  );
}
