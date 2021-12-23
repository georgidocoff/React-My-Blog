import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Col, Row, FormControl } from "react-bootstrap";

import "./AddPost.css";

import { create } from "../../services/articlesService";
import { isAuth } from "../../services/authService";

function AddPost() {
  const [article, setArticle] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });

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
    
    create({article}).then((res) => {
      //console.log(res);

      navigate("/");
    });
  };

  return (
    <Card body>
      <Form onSubmit={onSubmitHandler}>
        <Row>
          <Form.Label column lg={2}>
            Title
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="title"
              onChange={onAddPostChangeHandler}
              placeholder="Title..."
            />
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
              onChange={onAddPostChangeHandler}
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
            <Form.Control
              size="sm"
              as="textarea"
              name="description"
              onChange={onAddPostChangeHandler}
              placeholder="Create a blog post"
              style={{ height: "100px" }}
            />
          </Col>
        </Row>
        <br />
        <Button className="addPostSubmitButton" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default AddPost;
