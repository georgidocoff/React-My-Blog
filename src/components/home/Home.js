import { useEffect, useState, useContext } from "react";
import { Card, CardGroup } from "react-bootstrap";

import { isAuth } from "../../services/authService";
import { getUserById } from "../../services/userService";
import { getThree } from "../../services/articlesService";
import { UserContext, userContextValues } from "../../context/userContext";

function publishPostTime(createTime) {
  return Math.round((Date.now() - Date.parse(createTime)) / (60 * 1000)) - 60;
}

function Home() {
  const [data, setDate] = useState([]);
  const [users, setUsers] = useState([]);

  const userContext = useContext(UserContext);

  function renderPublishUser(userId) {
    let user = users?.find((x) => x.id == userId);
    if (!user) {
      return "N/A";
    }
    return `${user?.name} ${user?.surname}`;
  }

  useEffect(() => {
    getThree()
      .then((res) => {
        //console.log(res.result.items);
        setDate(res?.result.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    userContext.getAll().then((res) => {
      //console.log(res.result);
      setUsers(res?.result.items);
    }).catch((err) => { console.log(err) });
  },[userContext])

  data.map((x) => (x.userFullName = renderPublishUser(x.creatorUserId)));
  return (
    <CardGroup>
      {(data?.length > 0 &&
        data.map((x) => {
          return (
            <Card key={x.id}>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>{x.title}</Card.Title>
                <Card.Text>{x.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Created by: {x.userFullName}
                </small>
                <br />
                <small className="text-muted">
                  Post updated {publishPostTime(x.creationTime)} mins ago
                </small>
              </Card.Footer>
            </Card>
          );
        })) || <h5>No data avaiable...</h5>}
    </CardGroup>
  );
}

export default Home;
