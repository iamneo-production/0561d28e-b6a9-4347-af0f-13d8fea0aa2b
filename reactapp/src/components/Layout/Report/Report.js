import React, { useEffect, useRef, useState } from "react";
import Card from "./../../UI/Card";
import { Row, Col, Form, Button } from "react-bootstrap";
import Chart from "../Admin/Chart";
import JobChart from "./JobChart";
import axios from "axios";

const Report = () => {
  const data = useRef();
  const [isVisible, setisVisible] = useState(false);
  const ViewChart = () => {
    setisVisible(!isVisible);
  };
  
  const [t, setT] = useState(0);
  const [js, setJs] = useState(0);
  const [jp, setJp] = useState(0);
  const [tj, setTj] = useState(0);
  const [aj, setAj] = useState(0);
  const [w, setW] = useState(0);
  const [a, setA] = useState(0);
  const Reportdata = [
    {
      total: t,
      jobProviders: jp,
      jobSeekers: js,
      totalJobs: tj,
      jobsAvailabe: aj,
      jobsTaken: a,
      jobsWaiting: w,
    },
  ];
  const GetInitails = () => {
    useEffect(() => {
      axios
        .get('https://localhost:44375/admin/report/totalUsers/%20')
        .then(res => {
          setT(res.data.total);
          setJs(res.data.jobSeeker);
          setJp(res.data.jobProvider);
          setTj(res.data.totalJobs);
          setAj(res.data.activeJobs);
          setW(res.data.waiting);
          setA(res.data.accepted);

        })
        .catch(err => {
          console.log(err)
        })
    }, []);
  }
  async function GetDetails(data)
  {
    if(data === "")
    {
      data += "%20";
    }
    let res = await fetch('https://localhost:44375/admin/report/totalUsers/' + data,{
        method: 'GET',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
      });
      res = await res.json();
      setT(res.total);
          setJs(res.jobSeeker);
          setJp(res.jobProvider);
          setTj(res.totalJobs);
          setAj(res.activeJobs);
          setW(res.waiting);
          setA(res.accepted);
  }

  return (
    <div className="mx-5">
          {GetInitails()}
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
                onClick={event => GetDetails(data.current.value)}
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
                      <h5>Total jobs</h5>
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
                  <Col>
                    <Row>
                      <h5>Jobs Waiting</h5>
                    </Row>
                    <Row>
                      <h6>{item.jobsWaiting}</h6>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            {isVisible && (
              <Row>
                <Col sm={6}>
                  <Chart
                    item1={"Total Users"}
                    item2={"Job Provider"}
                    item3={"Job Seeker"}
                    item1data={item.total}
                    item2data={item.jobProviders}
                    item3data={item.jobSeekers}
                  />
                </Col>
                <Col sm={6}>
                  <JobChart
                    item1={"Total Jobs"}
                    item2={"Jobs Available"}
                    item3={"Jobs Taken"}
                    item4={"Jobs Waiting"}
                    item1data={item.totalJobs}
                    item2data={item.jobsAvailabe}
                    item3data={item.jobsTaken}
                    item4data={item.jobsWaiting}
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
