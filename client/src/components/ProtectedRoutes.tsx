import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUserInfo } from '../features/auth/authSlice';

const ProtectedRoutes: FC = () => {
    const authenticatePath = '/auth';
    const location = useLocation();
    const userInfo = useAppSelector(selectUserInfo);

    if (!userInfo) {
        return (
            <Navigate
                to={authenticatePath}
                replace
                state={{ redirectTo: location }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoutes;
