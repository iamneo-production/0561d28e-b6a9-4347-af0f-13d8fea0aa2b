import React, { useRef, useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AdminContext from '../../../store/Admin/AdminContext';
const AddNewUser = (props) => {
    const [Err_msg, setErr_msg] = useState(false);
    const [msg, setmsg] = useState("");
    var phoneno = /^\d{10}$/;
    const User = useRef();
    const Email = useRef();
    const Username = useRef();
    const Phone_num = useRef();
    const Password = useRef();
    const Confirm_pass = useRef();
    const Context = useContext(AdminContext);
    let formData = Context.editUser;
    var errors = [
        "Please fill all the input feilds",
        "Password should contain 6 characters, atleast one number and one special character",
        "Confirm password mismatched",
        "invalid phone number",
    ];
    var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const submit = (event) => {
        event.preventDefault();
        formData.userRole = User.current.value;
        formData.email = Email.current.value;
        formData.username = Username.current.value;
        formData.mobileNumber = Phone_num.current.value;
        formData.password = Password.current.value;
        const confirm_pass = Confirm_pass.current.value;
        setErr_msg(false);
        if (
            !(
                formData.userRole &&
                formData.email &&
                formData.username &&
                formData.mobileNumber &&
                formData.password &&
                confirm_pass
            )
        ) {
            setmsg(errors[0]);
            setErr_msg(true);
            return;
        }
        if (!regularExpression.test(formData.password)) {
            setmsg(errors[1]);
            setErr_msg(true);
            return;
        }
        if (formData.password !== confirm_pass) {
            setmsg(errors[2]);
            setErr_msg(true);
            return;
        }
        if (!formData.mobileNumber.match(phoneno)) {
            setmsg(errors[3]);
            setErr_msg(true);
            return;
        }
        const data = {
            email: Email.current.value,
            password: Password.current.value,
            username: Username.current.value,
            mobileNumber: Phone_num.current.value,
            userrole: User.current.value
        };
        Context.addNewUser(data);
    };
    return (
        <Container className=" mb-2 rounded  bg-light  ">
            <form className="text-left mx-4 bg-light p-3 rounded " onSubmit={submit}>
                <h3>New User</h3>
                <Form.Group className="mb-2">
                    <Form.Label>Enter Jobprovider/Jobseeker</Form.Label>
                    <Form.Control ref={User} as="select" id="jobProvider/jobSeeker">
                        <option value="Job Provider">Job Provider</option>
                        <option value="Job Seeker">Job Seeker</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        ref={Email}
                        id="email"
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        ref={Username}
                        id="username"
                        type="text"
                        placeholder="Enter username"
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        ref={Phone_num}
                        id="mobileNumber"
                        type="tel"
                        placeholder="Enter mobile number"
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={Password}
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Confrim Password</Form.Label>
                    <Form.Control
                        ref={Confirm_pass}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                    />
                </Form.Group>
                {Err_msg && (
                    <div className="alert alert-danger alert-dismissible fade show m-3">
                        <strong>Error!</strong> {msg}
                    </div>
                )}
                <div className="text-center">
                    <Button id="addUserButton" variant="primary" type="submit">
                        Add User
                    </Button>
                </div>
            </form>
        </Container>
    );
};
export default AddNewUser;
