import { Outlet } from 'react-router-dom';
import UserSideMenu from '../../components/UserSideMenu';

const User = () => {
    return (
        <>
            <div>
                <UserSideMenu />
            </div>
            <Outlet />
        </>
    );
};

export default User;
