import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import './PageNotFound.css'

function PageNotFound() {
  const navigate = useNavigate();

  const goHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="exception-notfound">
      <div className="exception-panel">
        <h1>404</h1>
        <h3>not found</h3>
        <p>The page that you are looking for does not exist</p>

        <Button variant="outline-primary" onClick={goHome}>
          Go back to home
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
