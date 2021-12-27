import { Spinner } from "react-bootstrap";

import './Loading.css';

function Loading() {
  return (
      <>
        <Spinner className="loading-first" animation="grow" variant="success" />
        <Spinner className="loading-second" animation="grow" variant="warning" />
        <Spinner className="loading-third" animation="grow" variant="info" />
        <Spinner className="loading-last" animation="grow" variant="light" />
      </>
//     <Spinner
//       animation="border"
//       role="status"
//       style={{
//         width: "200px",
//         height: "200px",
//       }}
//     >
//       <span className="visually-hidden"> Loading... </span>{" "}
//     </Spinner>
   );
}

export default Loading;