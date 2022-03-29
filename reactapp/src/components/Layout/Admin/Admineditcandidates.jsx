import React, { useRef, useContext ,useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate, useParams} from "react-router-dom";
import AdminContext from "../../../store/Admin/AdminContext";
import ContentContainer from "../../UI/ContentContainer";

function Admineditcandidates(props) {
 const [isError,setIsError]= useState(false)
  
  const Context = useContext(AdminContext);
  let form_val = Context.candidateEditData;
  const navigate = useNavigate();
  const Name = useRef();
  const PhoneNumber = useRef();
  const Email = useRef();
  const YearOfExperience = useRef();
  const Address = useRef();
 
  const[isEmailValid,setisEmailValid]=useState();
  const [isPhoneValid,setisPhoneValid]=useState();
 
  let { id } = useParams();
  
  
  const ValidateEmail = () => {
    setisEmailValid(
      Email.current.value !== "" && Email.current.value.includes("@")
    );
  };
  const ValidatePhone = () => {
    setisPhoneValid(PhoneNumber.current.value.match(/^\d{10}$/) ? true : false);
  };

// update function
  const onUpdate = (event) => {
    event.preventDefault();
    setIsError(false);
    if(isPhoneValid===false || isEmailValid===false)
    return
    if(!(Name.current.value && PhoneNumber.current.value && YearOfExperience.current.value && Address.current.value && Email.current.value))
    {
      setIsError(true);
      return;
    }
    
    form_val.name = Name.current.value;
    form_val.phone= PhoneNumber.current.value;
    form_val.experience= YearOfExperience.current.value;
    form_val.address = Address.current.value;
    form_val.email = Email.current.value;
    const data = {
      personId: id.toString(),
      personName: form_val.name,
      personAddress: form_val.address,
      personExp: form_val.experience,
      personPhone: form_val.phone,
      email: form_val.email
    }
    Context.candidateEdit(data);
    navigate("/admin/profile");
    
  };
  //cancel function
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <ContentContainer>
      <form  className="m-4 bg-light p-3 rounded " onSubmit={onUpdate}>
        <h3>Edit Candidate</h3>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={Name}
               
                id="editName"
                type="text"
                placeholder="Enter name"
               defaultValue={form_val.name}
               
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
               defaultValue={form_val.phone}
                ref={PhoneNumber}
                onBlur={ValidatePhone}
                id="editPhoneNumber"
                type="tel"
                pattern
                placeholder="Enter mobile number"
                
              />
              {isPhoneValid === false && (
                <p style={{ color: "red" }}>Invalid phone number</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year of Experiance</Form.Label>
              <Form.Control
                ref={YearOfExperience}
              defaultValue={form_val.experience}
                id="editYearOfExperience"
                type="number"
                min="0"
                max="60"
                placeholder="Enter Year of Experiance"
               
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
             defaultValue={form_val.address}
                ref={Address}
                id="editAddress"
                type="text"
                placeholder="Enter address"
              
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
               defaultValue={form_val.email}
                ref={Email}
                onBlur={ValidateEmail}
                id="editEmail"
                type="email"
                placeholder="Enter email"
               
              />
               {isEmailValid === false && (
                <p style={{ color: "red" }}>Invalid email</p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
        {isError && (
                <div className="alert alert-danger alert-dismissible fade show m-3">
                   Please fill all the input feilds
                </div>
              )}
          <Col className="text-center">
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          </Col>
          <Col className="text-center">
            <Button id="applyButton" type="submit" variant="success">
              Update
            </Button>
          </Col>
        </Row>
      </form>
    </ContentContainer>
  );
}

export default Admineditcandidates;
