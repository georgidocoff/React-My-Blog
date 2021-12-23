import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
 
import * as authService from '../../services/authService';

const Register = () => {

    const navigate = useNavigate();
    //const [cookies, setCookie] = useCookies(['auth']);

    function register(email, password, rePassword, userName, name, surname) {
        if (password != rePassword) {
            console.log('The passwordand repeat password not match.');
            return;
        }

        authService.register(email, password, rePassword, userName, name, surname)
            .then((authData) => {
                //console.log(authData.result.accessToken);
                //setCookie('auth', authData.result.accessToken);
                //console.log(authData);
                navigate('/');
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    }

    const onRegisterHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('emailAddress');
        let password = formData.get('password');
        let rePassword = formData.get('rePassword');
        let userName = formData.get('userName');
        let name = formData.get('name');
        let surname = formData.get('surname');
        
        register(email, password, rePassword, userName, name, surname);
    }

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>

            <Form method='POST' onSubmit={onRegisterHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="emailAddress" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" name="rePassword"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name="userName"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="name"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="Surname" name="surname"/>
                </Form.Group>

                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary" type="submit" >OK</Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>
    );
}

export default Register