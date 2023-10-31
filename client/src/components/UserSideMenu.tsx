import { useState } from 'react';
import {
    TbArrowBigRightLines,
    TbArrowBigLeftLines,
    TbUser,
    TbShoppingCart,
} from 'react-icons/tb';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const SideMenu = styled.header`
    margin-top: 7rem;
    float: left;
    border-radius: 0 12px 12px 0;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
    z-index: 100;
    display: inline-block;
    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
    ul li {
        cursor: pointer;
    }
`;

export const ClosedSideBar = styled(SideMenu)`
    nav {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;

        > button {
            width: 100%;
            padding: 18px;
        }

        > button svg {
            width: 24px;
            height: 24px;

            color: ${({ theme }) => theme.colors.primary};
        }

        ul {
            margin-top: 64px;
            width: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            flex-direction: column;

            a {
                width: 100%;
                padding: 16px 0;
                border-radius: 8px 0 0 8px;

                display: flex;
                align-items: center;
                justify-content: center;

                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }

    div {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;

        ul {
            margin-bottom: 16px;
            text-align: center;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;

            a {
                padding: 16px 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                transition: color 0.3s;
                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        span {
            padding: 16px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;

            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
        }
    }
`;

export const OpenSideBar = styled(SideMenu)`
    padding-left: 1rem;
    padding-right: 1rem;

    nav {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;

        > span {
            width: 100%;
            display: flex;
            align-items: flex-start;

            button {
                cursor: pointer;
                padding: 18px;

                svg {
                    width: 24px;
                    height: 24px;

                    color: ${({ theme }) => theme.colors.primary};
                }
            }
        }

        div {
            margin-top: 16px;

            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 24px;
            flex-direction: row;
            gap: 16px;

            img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
            }

            h1 {
                color: #fff;
                font-size: 14px;

                animation: ${appearFromRight} 0.4s;
            }
        }

        ul {
            margin-top: 64px;
            width: 100%;
            text-align: left;
            display: flex;
            flex-direction: column;

            a {
                color: ${({ theme }) => theme.colors.primary};
                padding: 16px 20px;
                border-radius: 8px 0 0 8px;

                display: flex;
                align-items: center;
                gap: 16px;

                transition: background 0.3s;

                p {
                    animation: ${appearFromRight} 0.4s;
                }

                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }

    div {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;

        ul {
            margin-bottom: 16px;
            text-align: left;
            width: 100%;
            display: flex;
            flex-direction: column;

            a {
                padding: 16px 20px;
                display: flex;
                align-items: center;
                color: ${({ theme }) => theme.colors.primary};
                gap: 16px;

                transition: color 0.3s;
                &:hover {
                }

                p {
                    animation: ${appearFromRight} 0.4s;
                }
            }
        }

        span {
            padding: 16px 0;
            border-radius: 8px 8px 0 0;

            width: 100%;

            display: flex;
            align-items: center;
            gap: 12px;

            p {
                text-overflow: ellipsis;
                color: ${({ theme }) => theme.colors.primary};
                width: 70%;
                padding-right: 12px;
                white-space: nowrap;
                animation: ${appearFromRight} 0.4s;
                overflow: hidden;
            }

            img {
                margin-left: 14px;
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
        }
    }
`;

const UserSideMenu = () => {
    const [sideBar, setSideBar] = useState(false);

    function handleChangeSideBar() {
        setSideBar((prevState) => !prevState);
    }
    return !sideBar ? (
        <ClosedSideBar>
            <nav>
                <button type="button" onClick={handleChangeSideBar}>
                    <TbArrowBigRightLines />
                </button>

                {/* <img src={logoImg} alt="Eu" /> */}

                {/* Links principais do app */}
                <ul>
                    <Link to="/user">
                        <TbUser />
                    </Link>
                    <Link to="/user/orders">
                        <TbShoppingCart />
                    </Link>
                </ul>
            </nav>
        </ClosedSideBar>
    ) : (
        <OpenSideBar>
            <nav>
                <span>
                    <button type="button" onClick={handleChangeSideBar}>
                        <TbArrowBigLeftLines />
                    </button>
                </span>

                <ul>
                    <Link to="/user">
                        <TbUser />
                        <p>Profile</p>
                    </Link>
                    <Link to="/user/orders">
                        <TbShoppingCart />
                        <p>Order History</p>
                    </Link>
                </ul>
            </nav>
        </OpenSideBar>
    );
};

export default UserSideMenu;
