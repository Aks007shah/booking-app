import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children }) => {
    const [isAdmin, setAdmin] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('users');

        if (user) {
            try {
                const objUser = JSON.parse(user);

                if (objUser?.data?.data?.isAdmin) {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            } catch (error) {
                setAdmin(false);
            }
        } else {
            setAdmin(false);
        }
    }, []);

    if (isAdmin === null) {
        return <div><Loader/></div>;
    }

    if (!isAdmin) {
        navigate('/account/login');
        return null;
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoute;
