import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AdminContext from "../../../store/Admin/AdminContext";
import Card from "../../UI/Card";
import classes from "./Openings.module.css";
import  EditIcon  from "../../../asserts/EditIcon";
import  DeleteIcon  from "../../../asserts/DeleteIcon";
import { useNavigate } from "react-router-dom";

function Openings(props) {
  const navigate = useNavigate();
  const Context = useContext(AdminContext);
  const editData = {};
  //delete Openings
  const onDelete = () => {
    Context.openingDelete(props.id);
  };
  //onEdit openings
  const onEdit = () => {
    editData.from_date = props.from_date;
    editData.to_date = props.to_date;
    editData.cid = props.id;
    editData.job_discription = props.job_discription;
    editData.job_location = props.job_location;
    editData.phone_number = props.phone_number;
    editData.wage_for_day = props.wage_for_day;
    Context.openingEditData = editData;

    navigate(`/admin/editjob/${props.id}`);
  };
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
                  <td>{props.from_date.split(' ')[0]}</td>
                </tr>
                <tr>
                  <td>Job Location :</td>
                  <td>{props.job_location}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>Wage Per Day :</td>
                  <td>{props.wage_for_day}</td>
                </tr>
                <tr>
                  <td>To Date :</td>
                  <td>{props.to_date.split(' ')[0]}</td>
                </tr>
                <tr>
                  <td>Phone Number :</td>
                  <td>{props.phone_number}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <div className="w-100 border  bg-secondary border-1 mt-2"></div>
        <Row className="text-center">
         
          <Col>
            {" "}
            <Button className="m-1" onClick={onEdit}>
              {EditIcon}
            </Button>
          </Col>

          <Col>
            <Button className="m-1" onClick={onDelete}>
             {DeleteIcon}
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default Openings;
