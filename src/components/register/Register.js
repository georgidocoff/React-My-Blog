import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/authService";
import {
  useNotificationContext,
  types,
} from "../../context/NotificationContext";
import Loading from "../loading/Loading";

const Register = () => {
  const { addNotification } = useNotificationContext();
  const [showLoading, setShowLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  function register(email, password, rePassword, userName, name, surname) {
     
    if (password != rePassword) {
      addNotification(`The passwordand repeat password not match.`, types.warn);
      return;
    }
    setShowLoading(true);
    authService
      .register(email, password, rePassword, userName, name, surname)
      .then((authData) => {
        //console.log(authData);
        setShowLoading(false);
        addNotification(
          `You successfuly create user with email: ${email}`,
          types.success
        );
        navigate("/");
      })
      .catch((err) => {
        // TODO: show notification
        //console.log(err);
        addNotification(
          "Something went wrong with user create...",
          types.error
        );
        setShowLoading(false);
      });
  }

  const onRegisterHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault(); 
      e.stopPropagation();
    }
    setValidated(true);
    let formData = new FormData(form);

    let email = formData.get("emailAddress");
    let password = formData.get("password");
    let rePassword = formData.get("rePassword");
    let userName = formData.get("userName");
    let name = formData.get("name");
    let surname = formData.get("surname");

    register(email, password, rePassword, userName, name, surname);
  };

  return !showLoading ? (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>

      <Form method="POST" noValidate validated={validated} onSubmit={onRegisterHandler}>
        <Form.Group className="mb-3" controlId="validationEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="emailAddress"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please type an e-mail.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationRePassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            name="rePassword"
            required
          />
          <Form.Control.Feedback type="invalid">
            Repeat password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" name="userName" required/>
          <Form.Control.Feedback type="invalid">
            Please fill a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name="name" required/>
          <Form.Control.Feedback type="invalid">
            Please fill a user first name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" placeholder="Surname" name="surname" required/>
          <Form.Control.Feedback type="invalid">
            Please fill a user sur name.
          </Form.Control.Feedback>
        </Form.Group>

        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" type="submit">
            OK
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Dialog>
  ) : (
    <Loading />
  );
};

export default Register;
