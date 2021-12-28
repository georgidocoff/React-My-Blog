import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

import * as cookiesService from "../../services/cookiesService";
import useUserState from "../../hooks/useUserState";
import * as userService from "../../services/userService";
import {
  useNotificationContext,
  types,
} from "../../context/NotificationContext";
import Loading from "../loading/Loading";

const Profile = () => {
  const { addNotification } = useNotificationContext();
  const userId = cookiesService.GetUserId();
  const navigate = useNavigate();
  const [user, setUser] = useUserState(userId);
  const [showLoading, setShowLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  function update(userId, profileData) {
    setShowLoading(true);
    userService
      .UpdateUserById(userId, profileData)
      .then((res) => {
        //console.log(res);
        setShowLoading(false);
        if (res?.success) {
          addNotification(
            `You successfully update profile with email ${res?.result.emailAddress}`,
            types.success
          );
          navigate("/");
        } else {
          addNotification("Something went wrong with update...", types.error);
        }
      })
      .catch((err) => {
        //console.log(err)
        addNotification(`Invalid profile update.`, types.error);
        setShowLoading(false);
      });
  }

  const profileSubmitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    let profileData = Object.fromEntries(new FormData(form));

   update(user.id, profileData);
  };

  return !showLoading ? (
    <Card className="form" style={{ width: "fit-content" }}>
      <Card.Body>
        <Form
          method="POST"
          noValidate
          validated={validated}
          onSubmit={profileSubmitHandler}
        >
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={user.userName}
                name="userName"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please fill a username.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={user.emailAddress}
                name="emailAddress"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please fill an e-mail.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Enter First Name"
                defaultValue={user.name}
                name="name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please fill user first name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSurName">
              <Form.Label>Sur Name</Form.Label>
              <Form.Control
                type="surName"
                placeholder="Enter Sur Name"
                defaultValue={user.surname}
                name="surName"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please fill user sur name.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridIsActive">
              <Form.Check
                type="checkbox"
                label="Is Active"
                defaultChecked={user.isActive}
                disabled
              />
              <Form.Control
                hidden
                type="isActive"
                defaultValue={user.isActive}
                name="isActive"
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  ) : (
    <Loading />
  );
};

export default Profile;
