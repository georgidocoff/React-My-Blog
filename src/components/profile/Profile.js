//import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import './Profile.css';

import * as cookiesService from '../../services/cookiesService';
import useUserState from '../../hooks/useUserState';
import * as userService from '../../services/userService';
import { useNotificationContext, types } from '../../context/NotificationContext';


const Profile = () => {
    const { addNotification } = useNotificationContext();
    const userId = cookiesService.GetUserId();
    const [user, setUser] = useUserState(userId);

    const profileSubmitHandler = (e) => {
        e.preventDefault();
        
        let profileData = Object.fromEntries(new FormData(e.currentTarget))

        userService.UpdateUserById(user.id, profileData)
            .then((res) => {
                //console.log(res);
                if (res?.success) {
                    addNotification(`You successfully update profile with email ${res?.result.emailAddress}`, types.success);
                  } else{
                    addNotification('Something went wrong with update...', types.error);
                  }
            })
            .catch((err) =>{
                //console.log(err)
                addNotification(`Invalid profile update.`, types.error);
            });
    }

    return (
        <Card className="form" style={{ width: 'fit-content' }}>
            <Card.Body>
                <Form method="POST" onSubmit={profileSubmitHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" defaultValue={user.userName} name="userName" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" defaultValue={user.emailAddress} name="emailAddress" />
                        </Form.Group>

                        {/* <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" naem="password"/>
                        </Form.Group> */}
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="Enter First Name" defaultValue={user.name} name="name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSurName">
                            <Form.Label>Sur Name</Form.Label>
                            <Form.Control type="surName" placeholder="Enter Sur Name" defaultValue={user.surname} name="surName" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridIsActive">
                            <Form.Check type='checkbox' label='Is Active' defaultChecked={user.isActive} disabled/>
                            <Form.Control hidden type="isActive" defaultValue={user.isActive} name="isActive" />
                    </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Profile;