import React, { useRef, useState } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Variable } from '../Variable';

const Auth = (props) => {
  const navigate = useNavigate();
  const [Err_msg, setErr_msg] = useState(false);

 var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


  const User = useRef();
  const Email = useRef();
  const Username = useRef();
  const Phone_num = useRef();
  const Password = useRef();
  const Confirm_pass = useRef();
  const [isUsernameValid, setisUsernameValid] = useState();
  const [isEmailValid, setisEmailValid] = useState();
  const [isPhoneValid, setisPhoneValid] = useState();
  const [isPasswordValid, setisPasswordValid] = useState();
  const [isConfirmPassalid, setisConfirmPassValid] = useState();
  let formData = {};

  const ValidateUsername = () => {
    setisUsernameValid(Username.current.value !== "");
  };
  const ValidateEmail = () => {
    setisEmailValid(
      Email.current.value !== "" && Email.current.value.includes("@")
    );
  };
  const ValidatePhone = () => {
    setisPhoneValid(Phone_num.current.value.match(/^\d{10}$/) ? true : false);
  };
  const ValidatePassword = () => {
    setisPasswordValid(regularExpression.test(Password.current.value));
  };
  const ValidateConfirmPass = () => {
    setisConfirmPassValid(
      Confirm_pass.current.value === Password.current.value
    );
  };

  const submit = (event) => {
    event.preventDefault();
    formData.userrole = User.current.value;
    formData.email = Email.current.value;
    formData.username = Username.current.value;
    formData.mobileNumber = Phone_num.current.value;
    formData.password = Password.current.value;
    const confirm_pass = Confirm_pass.current.value;
    setErr_msg(false);
    if (
      !(
        formData.userrole &&
        formData.email &&
        formData.username &&
        formData.mobileNumber &&
        formData.password &&
        confirm_pass
      )
    ) {
      setErr_msg(true);
      return;
    }
    let data = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      mobileNumber: formData.mobileNumber,
      
    }
    if (formData.userrole === "Admin") {
      PostAdminData(data);
      async function PostAdminData(data) {
        let res = await fetch(Variable.API_URL + "admin/signup",{
            method: 'POST',
            headers: {
              'Accept':'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          res = await res.json();
          console.log(res);
        if(res === "true")
        {
          navigate("/login");
        }
        else if(res === "false")
        {
          alert("Email already exists");
        }
        else{
          alert(res);
        }
      }
    } else {
      PostUserData(formData);
      async function PostUserData(formdata) {
        let res = await fetch(Variable.API_URL + "user/signup",{
            method: 'POST',
            headers: {
              'Accept':'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          res = await res.json();
        if(res === "true")
        {
          navigate("/login");
        }
        else if(res === "false")
        {
          alert("Email already exists");
        }
        else{
          alert(res);
        }
      }    
    }
  };

  return (
    <Container className=" w-100 h-100 py-5">
      <Row className="justify-content-center">
        <Col sm={8} md={6} xs={10} className=" mb-2 rounded  bg-light  ">
          <h1 className="text-center">Sign up</h1>
          <form className="text-left border border-1 px-2" onSubmit={submit}>
            <Form.Group className="mb-2">
              <Form.Label>Enter Admin/User/Jobseeker</Form.Label>
              <Form.Control
                ref={User}
                as="select"
                id="admin/jobprovider/jobseeker"
              >
                <option value="Admin">Admin</option>
                <option value="Job Provider">Job Provider</option>
                <option value="Job Seeker">Job Seeker</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={Email}
                onBlur={ValidateEmail}
                id="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            {isEmailValid === false && (
              <p style={{ color: "red" }}>Invalid email</p>
            )}
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                ref={Username}
                onBlur={ValidateUsername}
                id="username"
                type="text"
                placeholder="Enter username"
              />
              {isUsernameValid === false && (
                <p style={{ color: "red" }}>Username cannot be blank</p>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                ref={Phone_num}
                onBlur={ValidatePhone}
                id="mobileNumber"
                type="tel"
                placeholder="Enter mobile number"
              />
              {isPhoneValid === false && (
                <p style={{ color: "red" }}>Invalid phone number</p>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={Password}
                onBlur={ValidatePassword}
                id="password"
                type="password"
                placeholder="Enter Password"
              />
              {isPasswordValid === false && (
                <p style={{ color: "red" }}>
                  Invaild password, Password should contain 6 characters,
                  atleast one number and one special character{" "}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control
                ref={Confirm_pass}
                onBlur={ValidateConfirmPass}
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
              {isConfirmPassalid === false && (
                <p style={{ color: "red" }}>Confirm password mismatched</p>
              )}
            </Form.Group>
            {Err_msg && (
              <div className="alert alert-danger alert-dismissible fade show m-3">
                <strong>Error!</strong> Please fill all the input feilds
              </div>
            )}
            <div className="text-center">
              <Button id="submitButton" variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>

          <div className="mt-3 text-center">
            <p>
              Already a User?
              <br />
              <a id="signinLink" href="login">
                Log in
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Auth;