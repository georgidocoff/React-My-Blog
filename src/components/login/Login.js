import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";

import * as authService from "../../services/authService";
import {
  useNotificationContext,
  types,
} from "../../context/NotificationContext";
import { Default_Token_Name } from "../../shared/constants";

import Loading from "../loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([Default_Token_Name]);
  const { addNotification } = useNotificationContext();
  const [showLoading, setShowLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  function login(email, password) {
    setShowLoading(true);
    authService
      .login(email, password)
      .then((authData) => {
        //console.log(authData);
        setShowLoading(false);
        setCookie(Default_Token_Name, authData.result.accessToken);
        addNotification("You logged in successfully", types.success);
        navigate("/");
      })
      .catch((err) => {
        // TODO: show notification
        //console.log(err);
        addNotification(`Invalid credential for login.`, types.warn);
        setShowLoading(false);
      });
  }

  const onLoginHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault(); 
      e.stopPropagation();
    }
    setValidated(true);
    let formData = new FormData(form);

    let email = formData.get("email");
    let password = formData.get("password");
    
    login(email, password);
  };

  return !showLoading ? (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title> Login </Modal.Title>{" "}
      </Modal.Header>{" "}
      <Form  method="POST" noValidate validated={validated} onSubmit={onLoginHandler} >
        <Form.Group className="mb-3" controlId="validationEmail">
          <Form.Label> Email address </Form.Label>{" "}
          <Form.Control type="text" name="email" placeholder="Enter email" required />
          <Form.Control.Feedback type="invalid">
            Please fill an email address or username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationPassword">
          <Form.Label> Password </Form.Label>{" "}
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
           <Form.Control.Feedback type="invalid">
            Please fill a password.
          </Form.Control.Feedback>
        </Form.Group>{" "}
        <Modal.Footer>
          <Button variant="secondary"> Cancel </Button>{" "}
          <Button variant="primary" type="submit">
            {" "}
            OK{" "}
          </Button>{" "}
        </Modal.Footer>{" "}
      </Form>{" "}
    </Modal.Dialog>
  ) : (
    <Loading />
  );
};

export default Login;
