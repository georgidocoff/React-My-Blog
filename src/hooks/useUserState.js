import {
    useState,
    useEffect,
    useMemo
} from 'react';

import * as userService from '../services/userService';

const useUserState = (userId) => {
    const [user, setUser] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        userService.getUserById(userId)
            .then((res) => {
                setUser(res.result);
            })
            .catch((err) =>
            console.log(err)
            );
        return () => {
            controller.abort();
        }
    }, [userId, controller]);

    return [
        user,
        setUser
    ]
};

export default useUserState;