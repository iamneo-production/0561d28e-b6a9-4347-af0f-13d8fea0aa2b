import { Button, Container, Col, Form, Row } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../store/LoginContext";

function Login() {
  const [isError, setisError] = useState(false);
  const [user, setuser] = useState(false);
  const Userid = useRef();
  //const alert = useAlert();
  const Password = useRef();
  const [isEmailValid, setisEmailValid] = useState();

  const ValidateEmail = () => {
    setisEmailValid(
      Userid.current.value !== "" && Userid.current.value.includes("@")
    );
  };
  const Navigate = useNavigate();
  const context = useContext(LoginContext);
  let admin, jobSeeker, jobProvider;

  //onClick Event
  function onLogin(event) {
    event.preventDefault();
    setisError(false);
    const payload = {
      email: Userid.current.value,
      password: Password.current.value,
    };

    if (!(Userid.current.value && Password.current.value)) {
      setisError(true);
      return;
    }
    postLogin(payload);
  }
  function postLogin(data) {
    let admin,
      user,
      a = 0;
    IsAdmin(data);
    async function IsAdmin(data) {
      admin = await fetch("https://localhost:44375/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      admin = await admin.json();
      if (admin) {
        a++;
        Navigate("/admin/dashboard");
        context.login(admin);
      } else {
        IsUser(data);
        async function IsUser(data) {
          user = await fetch("https://localhost:44375/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify(data),
          });
          user = await user.json();
          localStorage.setItem("id", user[0]);
          localStorage.setItem("uname", user[2]);
          if (user[1] === "Job Seeker") {
            Navigate("/Jobseeker/dashboard");
            context.login(user);
          } else if (user[1] === "Job Provider") {
            Navigate("/Jobprovider/dashboard");
            context.login(user);
          } else if (user[1] == null) {
            alert("Invalid user credentials");
          }
        }
      }
    }
  }
  return (
    <Container className="vh-100 pt-5 w-100">
      <Row className="justify-content-center">
        <Col sm={8} md={6} xs={10} className=" m-2 rounded  p-2 bg-light ">
          <h1 className="text-center">Log in</h1>
          <form className="text-left p-3" onSubmit={onLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={Userid}
                onBlur={ValidateEmail}
                id="email"
                type="email"
                placeholder="Enter email"
              />
              {isEmailValid === false && (
                <p style={{ color: "red" }}>Invalid email</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={Password}
                id="password"
                type="password"
                placeholder="Enter Password"
              />
            </Form.Group>
            {isError && (
              <div className="alert alert-danger alert-dismissible fade show m-3">
                <strong>Error!</strong> Please fill all the input feilds
              </div>
            )}
            {user && (
              <div className="alert alert-danger alert-dismissible fade show m-3">
                <strong>User not found</strong>
              </div>
            )}

            <div className="text-center">
              <Button id="loginButton" variant="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <p>
              New User?{" "}
              <a id="signupLink" href="Signup">
                Sign up
              </a>
            </p>
          </div>
        </Col>
      </Row>
      {admin ? <a href="Admindashboard" /> : <a href="Jobseekerdashboard" />}
    </Container>
  );
}
export default Login;
