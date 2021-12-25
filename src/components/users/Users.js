import { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, InputGroup, FormControl } from "react-bootstrap";

import { UserContext, userContextValues } from "../../context/userContext";
import { isAdmin } from "../../services/authService";

function Users() {
  const [users, setUsers] = useState([]);
  const userContext = useContext(UserContext);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditClose = () => setShowEditDialog(false);
  
  const [data, setData] = useState({
    name: "",
    surname: "",
    userName: "",
    emailAddress: "",
    isActive: Boolean,
    roleNames: [],
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleDeleteClose = () => setShowDeleteDialog(false);

  useEffect(() => {
   getUsers();
  }, []);

  const onChangeUserNameHandler = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getUsers(){
    userContext.getAll().then((res) => {
      //console.log(res.result);
      setUsers(res.result.items);
    }).catch((err) => { console.log(err) });
  }

  function onChangeCheckBoxHandler(check) {
    data.isActive = !check;
  }

  function onEditClickHandler(userData) {
    setShowEditDialog(true);

    if (showEditDialog) {
      //console.log(userData);
      handleEditClose();

      // update the selected user
      userContext.update(userData).then((res) => {
        //console.log(res);
        getUsers();
      });
    }
  }

  function onDeleteClickHandler(data) {
    setShowDeleteDialog(true);

    if (data) {
      handleDeleteClose();
      userContext.deleteUser(data.data.id).then((res) => {
        console.log(res);
        getUsers();
      });
    }
  }

  return (
    <>
      <Table responsive>
        <thead>
          {users.length > 0 &&
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Sur Name</th>
            <th>UserName</th>
            <th>RoleNames</th>
            {isAdmin() && <th>Buttons</th>}
          </tr> || <tr><th>No data avaiable...</th></tr>}
        </thead>
        <tbody>
          {users.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.surname}</td>
              <td>{x.userName}</td>
              <td>{x.roleNames}</td>
              {isAdmin() &&
              <td>
                <Button
                  id={x.id}
                  variant="secondary"
                  onClick={() => {
                    onEditClickHandler(x);
                    setData(x);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  id={x.id}
                  variant="danger"
                  onClick={() => {
                    onDeleteClickHandler();
                    setData(x);
                  }}
                >
                  Dell
                </Button>
              </td>}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditDialog} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="userName">Username</InputGroup.Text>
            <FormControl
              placeholder="Enter username"
              defaultValue={data.userName}
              name="userName"
              aria-describedby="basic-addon1"
              onChange={onChangeUserNameHandler}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="name">FirstName</InputGroup.Text>
            <FormControl
              placeholder="Enter Name"
              defaultValue={data.name}
              type="text"
              name="name"
              aria-describedby="basic-addon1"
              onChange={onChangeUserNameHandler}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="surName">Sur Name</InputGroup.Text>
            <FormControl
              placeholder="Enter Sur Name"
              defaultValue={data.surname}
              type="text"
              name="surname"
              aria-describedby="basic-addon1"
              onChange={onChangeUserNameHandler}
            />
          </InputGroup>
          {/* <InputGroup className="mb-3">
            <InputGroup.Text id="password">Password</InputGroup.Text>
            <FormControl
              placeholder="Enter password"
              type="password"
              name="password"
              aria-describedby="basic-addon1"
            />
          </InputGroup> */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="emailAddress">@</InputGroup.Text>
            <FormControl
              placeholder="Enter email"
              defaultValue={data.emailAddress}
              type="email"
              name="emailAddress"
              aria-describedby="basic-addon1"
              onChange={onChangeUserNameHandler}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              onChange={() => {
                onChangeCheckBoxHandler(data.isActive);
                
              }}
              defaultChecked={data.isActive}
            />
            <FormControl
              placeholder="User is active"
              disabled
              aria-label="Is Active"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onEditClickHandler(data)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteDialog} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure You want to delete current user {data.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              onDeleteClickHandler({ data });
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;
