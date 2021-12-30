import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Col,
  Row,
  FormControl,
  FormGroup,
} from "react-bootstrap";

import "./AddPost.css";

import { create } from "../../services/articlesService";
import { isAuth } from "../../services/authService";
import {
  useNotificationContext,
  types,
} from "../../context/NotificationContext";

import Loading from "../loading/Loading";

function AddPost() {
  const [article, setArticle] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const { addNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onAddPostChangeHandler = (e) => {
    const value = e.target.value;
    //console.log(value);
    setArticle({
      ...article,
      [e.target.name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let articleData = Object.fromEntries(new FormData(e.currentTarget));

    if (articleData.title && articleData.description) {
      setShowLoading(true);
      create(articleData)
        .then((res) => {
          //console.log(res?.result.title);
          setShowLoading(false);
          if (res?.success) {
            addNotification(
              `You successfully create article with title ${res?.result.title}`,
              types.success
            );
          } else {
            addNotification("Something went wrong with update...", types.error);
          }
          navigate("/");
        })
        .catch((err) => {
          addNotification(
            "Something went wrong with user create...",
            types.error
          );
          setShowLoading(false);
        });
    } else {
      setShowLoading(true);
      addNotification("Missing article title or description.", types.error);
      setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    }
  };

  return !showLoading ? (
    <Card body>
      <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
        <Row>
          <Form.Label column lg={2}>
            Title
          </Form.Label>
          <Col>
            <Form.Group className="mb-3" controlId="validationTitle">
              <Form.Control
                type="text"
                name="title"
                placeholder="Title..."
                onChange={onAddPostChangeHandler}
                required
              />
              <span style={{ color: "red" }}>
                {!article.title && " Title is required"}
              </span>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column="sm" lg={2}>
            Author
          </Form.Label>
          <Col>
            <Form.Control
              disabled
              size="sm"
              defaultValue={"author"}
              type="text"
              placeholder="Author..."
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column="sm" lg={2}>
            Image
          </Form.Label>
          <Col>
            <Form.Control
              size="sm"
              type="text"
              name="imageUrl"
              placeholder="Image url..."
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column="sm" lg={2}>
            Article
          </Form.Label>
          <Col>
            <Form.Group className="mb-3" controlId="validationAricle">
              <Form.Control
                size="sm"
                as="textarea"
                name="description"
                placeholder="Create a blog post"
                style={{ height: "100px" }}
                onChange={onAddPostChangeHandler}
                required
              />
              <span style={{ color: "red" }}>
                {!article.description && " Description is required"}
              </span>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Button className="addPostSubmitButton" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  ) : (
    <Loading />
  );
}

export default AddPost;
