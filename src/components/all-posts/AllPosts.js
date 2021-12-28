import { useState, useEffect, useContext } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ArticleContext } from "../../context/articleContext";
import Loading from "../loading/Loading";

import "./AllPosts.css";

const AllPosts = () => {
  const [data, setData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    creationTime: "",
    creatorUserId: 0,
  });
  const [showLoading, setShowLoading] = useState(false);
  const articleContext = useContext(ArticleContext);

  useEffect(() => {
    getStoredArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getStoredArticles() {
    setShowLoading(true);
    articleContext.getAllArticles().then((res) => {
      //console.log(res.result);
      setShowLoading(false);
      setData(res?.result.items);
    });
  }

  return !showLoading ? (
    <>
      {(data.length > 0 &&
        data.map((x) => (
          <>
            <br />
            <Row>
              <Col>
                <Card.Body key={x.id}>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>{x.description}</Card.Text>
                  <Link className="button" to={`/post/${x.id}/details`}>
                    Details
                  </Link>
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
  ) : (
    <Loading />
  );
};

export default AllPosts;
