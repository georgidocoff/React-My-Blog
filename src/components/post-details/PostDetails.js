import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import useArticleState from "../../hooks/useArticleState";

function PostDetails() {

  function onEditClickHandler(articleData) {
    //do something
  }

  function onDeleteClickHandler(articleData) {
    //delete article
  }

  const { articleId } = useParams();
  const [article, setArticle] = useArticleState(articleId);
  console.log(article);
  return (
    <>
      <br />
      <Row key={article.id}>
        <Col>
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
          </Card.Body>
        </Col>
        <Col>
          <Card className="pictureInPost">
            <Card.Img variant="top" src={article.imageUrl} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Card.Footer>
          <Button
            id={article.id}
            variant="secondary"
            onClick={() => {
              onEditClickHandler(article);
              setArticle(article);
            }}
          >
            Edit
          </Button>{" "}
          <Button
            id={article.id}
            variant="danger"
            onClick={() => {
              onDeleteClickHandler();
              setArticle(article);
            }}
          >
            Dell
          </Button>
        </Card.Footer>
      </Row>
    </>
  );
}

export default PostDetails;
