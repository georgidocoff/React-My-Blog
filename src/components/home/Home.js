import { useEffect, useState } from "react";
import { Card, CardGroup } from "react-bootstrap";

import {getThree} from '../../services/articlesService';
function Home(){
 const[data, setDate]= useState([]);

 useEffect(()=>{
   getThree().then((res)=>{
        //console.log(res.result.items);
        setDate(res.result.items);
    })
    .catch((err)=>{console.log(err)})
 },[])
    
 console.log(data);

  return (
    <CardGroup>
      {data.map((x)=>{
        return(
        <Card>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>{x.title}</Card.Title>
          <Card.Text>
            {x.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated {Math.round((Date.now() - Date.parse(x.creationTime))/(60*1000))-60} mins ago</small>
        </Card.Footer>
      </Card>)
      })}no
    </CardGroup>
  );
};

export default Home;