import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';

import * as authService from '../../services/authService';
import { useNotificationContext, types } from '../../context/NotificationContext';
import { Default_Token_Name } from '../../shared/constants';

const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies([Default_Token_Name]);
    const { addNotification } = useNotificationContext();

    function login(email, password) {
        authService.login(email, password)
            .then((authData) => {
                console.log(authData);
                setCookie(Default_Token_Name, authData.result.accessToken);
                addNotification('You logged in successfully', types.success);
                navigate('/');

            })
            .catch((err) => {
                // TODO: show notification
                //console.log(err);
                addNotification(`Invalid credential for login.`, types.warn);
            });
    }

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        login(email, password);
    }

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onLoginHandler} method="POST">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary" type="submit">OK</Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>
    );
}

export default Login;