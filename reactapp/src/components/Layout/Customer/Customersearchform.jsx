import React, { useContext, useRef } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import JobProviderContext from "../../../store/Customer/JobProviderContext";
import Card from "../../UI/Card";

function Customersearchform() {
  const Context = useContext(JobProviderContext);
  const data = useRef();
  const style = `border-radius: 20px`;
  return( 
    <Card>
      <form>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Control style={{borderRadius: "50px", outline: "none"}}
                type="text"
                ref={data}
                placeholder="Type here to search for jobs"
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary text-center" id="search" style={{borderRadius: "50px", height: '40px', width: '100px'}}  onClick={event => Context.search(data.current.value)}>
              Search
            </Button>
          </Col>
        </Row>
      </form>
    </Card>
  );
}

export default Customersearchform;
