import { useRef, useState } from "react";
import { Button,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ContentContainer from "../../UI/ContentContainer";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AdminContext from "../../../store/Admin/AdminContext";
const EditUser = () => {
  const [Err_msg, setErr_msg] = useState(false);
  const [msg, setmsg] = useState("");
  const navigate=useNavigate();
  const Context=useContext(AdminContext); 
  var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  var phoneno = /^\d{10}$/;
  const User = useRef();
  const Email = useRef();
  const Username = useRef();
  const Phone_num = useRef();
  let { id } = useParams();
  let formData ={...Context.userEditdata} ;
  var errors = [
    "Please fill all the input feilds",
    "Password should contain 6 characters, atleast one number and one special character",
    "Confirm password mismatched",
    "invalid phone number",
  ]
  const onCancel=()=>{
    navigate(-1);
  }
  const onUpdate = (event) => {
    event.preventDefault();
    formData.userRole = User.current.value;
    formData.email = Email.current.value;
    formData.username = Username.current.value;
    formData.mobileNumber = Phone_num.current.value;
    setErr_msg(false);
    if (
      !(
        formData.userRole &&
        formData.email &&
        formData.username &&
        formData.mobileNumber &&
        formData.password 
       
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
   
    if (!formData.mobileNumber.match(phoneno)) {
      setmsg(errors[3]);
      setErr_msg(true);
      return;
    }
    var data = {
      email: formData.email,
      password: "",
      username: formData.username,
      mobileNumber: formData.mobileNumber,
      userrole: formData.userRole
    }
    Context.editUser(data, id);
    navigate(-1);
  };
  return (
    <ContentContainer>
         <form className="text-left mt-5  p-3 rounded bg-light " onSubmit={onUpdate}>
          <h3>Edit User</h3>
            <Form.Group className="mb-2">
              <Form.Label>Enter Jobprovider/Jobseeker</Form.Label>
              <Form.Control ref={User} as="select" defaultValue={formData.userRole} id="jobProvider/jobSeeker">
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
                defaultValue={formData.email}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                ref={Username}
                id="username"
                type="text"
                placeholder="Enter username"
                defaultValue={formData.name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                ref={Phone_num}
                id="mobileNumber"
                type="tel"
                placeholder="Enter mobile number"
                defaultValue={formData.mobileNumber}
              />
            </Form.Group>
            {Err_msg && (
              <div className="alert alert-danger alert-dismissible fade show m-3">
                <strong>Error!</strong> {msg}
              </div>
            )}
            <div className=" d-flex justify-content-around">
              <Button id="Cancel-btn" variant="secondary" onClick={onCancel} >
                cancel
              </Button>
              <Button id="Userupdate-btn" variant="success" type="submit">
               update 
              </Button>
            </div>
          </form>
</ContentContainer>   
);
}
export default EditUser;
