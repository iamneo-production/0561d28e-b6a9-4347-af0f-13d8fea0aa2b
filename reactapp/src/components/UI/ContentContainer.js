import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function ContentContainer(props) {
  return <Container fluid style={{height:"85vh ",overflowX:"hidden"}}><Row className="justify-content-center">
      <Col sm={8} md={10} className=" mb-2 rounded">{props.children}</Col>
  </Row></Container>;
  //changes
}

export default ContentContainer;
