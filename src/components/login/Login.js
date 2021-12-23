import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';

import * as authService from '../../services/authService';

const Login = () => {

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['auth']);

    function login(email, password) {
        authService.login(email, password)
            .then((authData) => {
                //console.log(authData.result.accessToken);
                setCookie('auth', authData.result.accessToken);

                navigate('/');
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
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