import { useState, useEffect, useContext } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { ArticleContext } from "../../context/articleContext";

import "./AllPosts.css";

const AllPosts = () => {
  const [data, setData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    creationTime: "",
    creatorUserId: 0,
  });

  const articleContext = useContext(ArticleContext);

  useEffect(() => {
    getStoredArticles();
  }, [getStoredArticles]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getStoredArticles() {
    articleContext.getAllArticles().then((res) => {
      //console.log(res.result);
      setData(res?.result.items);
    });
  }

  return (
    <>
      {(data.length > 0 &&
        data.map((x) => (
          <>
            <br />
            <Row key={x.id}>
              <Col>
                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>{x.description}</Card.Text>
                  <Button variant="primary">Details</Button>
                </Card.Body>
              </Col>
              <Col>
                <Card className="pictureInPost">
                  <Card.Img variant="top" src={x.imageUrl} />
                </Card>
              </Col>
            </Row>
          </>
        ))) || <h3>No data avaiable...</h3>}
    </>
  );
};

export default AllPosts;
