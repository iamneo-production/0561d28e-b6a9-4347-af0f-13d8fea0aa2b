import React, { useRef, useState } from "react";
import Card from "./../../UI/Card";
import { Row, Col, Form, Button } from "react-bootstrap";
import Chart from "./Chart";

function Report() {
  const data = useRef();
  const [isVisible, setisVisible] = useState(false);
  const ViewChart = () => {
    setisVisible(!isVisible);
  };
  const Reportdata = [
    {
      jobProviders: 200,
      jobSeekers: 400,
      jobsAvailabe: 300,
      jobsTaken: 150,
    },
  ];
  return (
    <div className="mx-5">
      <Card>
        <form>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Control
                  style={{ borderRadius: "50px", outline: "none" }}
                  type="text"
                  ref={data}
                  placeholder="Type here to search for jobs"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="primary text-center"
                id="search"
                style={{ borderRadius: "50px", height: "40px", width: "100px" }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
      <Card>
        {Reportdata.map((item, index) => (
          <div
            style={{
              border: "2px solid blue",
              borderRadius: "15px",
              padding: "10px",
            }}
          >
            <Row>
              <h4>Total Number of users and job reports in this Application</h4>
            </Row>
            <Row className=" d-flex " onClick={ViewChart}>
              <Col>
                <Row>
                <Col>
                    <Row>
                      <h5>Total Users</h5>
                    </Row>
                    <Row>
                      <h6>{item.jobProviders + item.jobSeekers}</h6>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <h5>Job Providers</h5>
                    </Row>
                    <Row>
                      <h6>{item.jobProviders}</h6>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <h5>Job Seekers</h5>
                    </Row>
                    <Row>
                      <h6>{item.jobSeekers}</h6>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Row>
                      <h5>Active jobs</h5>
                    </Row>
                    <Row>
                      <h6>{item.jobsAvailabe + item.jobsTaken}</h6>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <h5>Available jobs</h5>
                    </Row>
                    <Row>
                      <h6>{item.jobsAvailabe}</h6>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <h5>Jobs taken</h5>
                    </Row>
                    <Row>
                      <h6>{item.jobsTaken}</h6>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            {isVisible && (
              <Row>
                <Col sm={6}>
                  <Chart
                    item1={"Job Seeker"}
                    item2={"Job Provider"}
                    item1data={item.jobSeekers}
                    item2data={item.jobProviders}
                  />
                </Col>
                <Col sm={6}>
                  <Chart
                    item1={"Available Jobs"}
                    item2={"Jobs Taken"}
                    item1data={item.jobsAvailabe}
                    item2data={item.jobsTaken}
                  />
                </Col>
              </Row>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}

export default Report;
