import styled from 'styled-components';
import { MdMenu, MdClose } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Button, ButtonGroup } from '../styles/global';
import device from '../styles/BreakPoints';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, selectUserInfo } from '../features/auth/authSlice';

const Nav = styled.nav`
    background: ${({ theme }) => theme.colors.primary};
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    z-index: 200;
`;

const NavContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

const NavBrand = styled(Link)`
    font-weight: bold;
    font-size: 2.4rem;
    color: white;
    font-family: sans-serif;
    padding: 5px 0;
    text-decoration: none;
    white-space: nowrap;
`;

const NavToggleBtn = styled.button`
    display: inline-block;
    @media ${device.md} {
        display: none;
    }
`;
const NavMenuWrap = styled.div`
    flex-basis: 100%;
    flex-grow: 1;
    flex-direction: column;
    /* display: none; */

    display: flex;
    flex-direction: column;
    position: absolute;
    top: 94px;
    left: -110%;
    opacity: 1;
    transition: all 0.5s ease;
    width: 100%;
    &.active {
        background: ${({ theme }) => theme.colors.primary};
        left: 0px;
        opacity: 1;
        transition: all 0.5s ease;
    }
    @media ${device.md} {
        width: unset;
        position: unset;
        align-items: center;
        justify-content: flex-end;
        flex-basis: auto;
        flex-direction: row;
    }
`;
const NavbarLinkWrap = styled.ul`
    display: flex;
    list-style: none;
    text-align: center;
    flex-direction: column;
    align-items: center;
    @media ${device.md} {
        flex-direction: row;
        align-items: flex-start;
        margin-right: 1.4rem;
    }
`;
const NavbarItem = styled.li`
    width: 100%;
    text-decoration: none;
    padding: 1.5rem 0;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    color: white;
    & > a {
        color: #fff;
        text-decoration: none;
    }
    @media ${device.md} {
        padding: 0.5rem;
    }
`;
const AuthBtn = styled(Button)`
    font-family: sans-serif;
    font-size: 1rem;
    font-weight: bold;

    @media ${device.md} {
        margin-left: 1rem;
    }
`;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleHandler = () => setOpen(!open);
    const userInfo = useAppSelector(selectUserInfo);

    const onLogout = async () => {
        try {
            await dispatch(logout());
        } catch (error) {
            console.log(error);
        } finally {
            navigate('/auth');
        }
    };

    // useEffect(() => {
    //     if (isSuccess && !userInfo) navigate('/');
    // }, [isSuccess, userInfo, navigate]);
    return (
        <Nav>
            <NavContainer>
                <NavBrand to="/">NATORI</NavBrand>

                {open ? (
                    <NavToggleBtn onClick={toggleHandler}>
                        <MdClose size={32} color="#fff" />
                    </NavToggleBtn>
                ) : (
                    <NavToggleBtn onClick={toggleHandler}>
                        <MdMenu size={32} color="#fff" />
                    </NavToggleBtn>
                )}

                <NavMenuWrap className={open ? 'active' : ''}>
                    <NavbarLinkWrap>
                        <NavbarItem>
                            <Link to="/">Products</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/cart">Cart</Link>
                        </NavbarItem>
                        {userInfo ? (
                            <NavbarItem>
                                <Link to="/user">User</Link>
                            </NavbarItem>
                        ) : null}
                    </NavbarLinkWrap>
                    <ButtonGroup>
                        {userInfo ? (
                            <AuthBtn $block $outline onClick={onLogout}>
                                Logout
                            </AuthBtn>
                        ) : (
                            <AuthBtn
                                $block
                                $outline
                                onClick={() => navigate('/auth')}
                            >
                                Login
                            </AuthBtn>
                        )}
                    </ButtonGroup>
                </NavMenuWrap>
            </NavContainer>
        </Nav>
    );
};

export default Navbar;
