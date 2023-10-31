import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Location } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '../app/hooks';
import {
    Container,
    Button,
    Input,
    InputErrorMessage,
    ButtonGroup,
} from '../styles/global';
import {
    register,
    login,
    // reset
} from '../features/auth/authSlice';
import {
    ModalType,
    setLoading,
    setModal,
} from '../features/common/commonSlice';
import getError from '../utils/getError';

const AuthCard = styled(motion.div)`
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
        0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
`;

const FlexWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogInFormContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    height: 100%;

    left: 0;
    width: 50%;
    z-index: 2;
`;
const SignUpFormContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    height: 100%;

    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
`;

const Form = styled.form`
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
`;

const OverlayContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
`;

const OverLay = styled(motion.div)`
    background: linear-gradient(120deg, #557153, #7d8f69);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

const OverlayLeftPanel = styled(motion.div)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(-20%);
    transition: transform 0.6s ease-in-out;
`;
const OverlayRightPanel = styled(motion.div)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    right: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;
const HeadText = styled.h5`
    font-size: 2rem;
    font-weight: bold;
`;

const overlayContainerVariants: Variants = {
    signIn: {
        transform: 'translateX(0px)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
    signUp: {
        transform: 'translateX(-100%)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
};
const overlayVariants: Variants = {
    signIn: {
        transform: 'translateX(0px)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
    signUp: {
        transform: 'translateX(50%)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
};
const overlayLeftVariants: Variants = {
    signIn: {
        transform: 'translateX(-20%)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
    signUp: {
        transform: 'translateX(0)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
};
const overlayRightVariants: Variants = {
    signIn: {
        transform: 'translateX(0)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
    signUp: {
        transform: 'translateX(20%)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
};
const logInFormVariants: Variants = {
    signIn: {
        transform: 'translateX(0)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
    signUp: {
        transform: 'translateX(100%)',
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
};
const signUpFormVariants: Variants = {
    signIn: {
        transform: 'translateX(0)',
        opacity: 0,
        zIndex: 1,
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
    signUp: {
        transform: 'translateX(100%)',
        opacity: 1,
        zIndex: 5,
        transition: { duration: 0.6, ease: 'easeInOut' },
    },
};

type RedirectLocationState = {
    redirectTo: Location;
};

const Auth: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { state: locationState } = useLocation();

    type SignUpFormData = {
        name: string;
        email: string;
        password: string;
    };
    type LoginFormData = {
        email: string;
        password: string;
    };

    const signUpSchema = yup.object({
        name: yup.string().required('Username is required'),
        email: yup
            .string()
            .email('Email format is not valid')
            .required('Email is required'),
        password: yup.string().required('Password is required'),
    });
    const loginSchema = yup.object({
        email: yup
            .string()
            .email('Email format is not valid')
            .required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const {
        register: signUpRegister,
        formState: { errors: signUpErrors },
        handleSubmit: handleSignUpSubmit,
    } = useForm<SignUpFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(signUpSchema),
    });
    const {
        register: loginRegister,
        formState: { errors: loginErrors },
        handleSubmit: handleLoginSubmit,
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    });

    const directAfterAuth = () => {
        if (locationState) {
            const { redirectTo } = locationState as RedirectLocationState;
            navigate(`${redirectTo.pathname}${redirectTo.search}`, {
                replace: true,
            });
        } else {
            navigate('/', { replace: true });
        }
    };

    const onSignUpSubmit = handleSignUpSubmit((signUpData) => {
        dispatch(setLoading(true));
        dispatch(register(signUpData))
            .unwrap()
            .then((val) => {
                directAfterAuth();
            })
            .catch((error) => {
                const status = error.response?.status || 500;
                dispatch(
                    setModal({
                        title: `Error ${status}`,
                        message: getError(error),
                        errorCode: status,
                        type: ModalType.error,
                    })
                );
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    });
    const onLogInSubmit = handleLoginSubmit((loginData) => {
        dispatch(setLoading(true));
        dispatch(login(loginData))
            .unwrap()
            .then((val) => {
                directAfterAuth();
            })
            .catch((error) => {
                const status = error.response?.status || 500;
                dispatch(
                    setModal({
                        title: `Error ${status}`,
                        message: getError(error),
                        errorCode: status,
                        type: ModalType.error,
                    })
                );
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    });

    return (
        <Container>
            <FlexWrap>
                <AuthCard animate={isSignIn ? 'signIn' : 'signUp'}>
                    <LogInFormContainer variants={logInFormVariants}>
                        <Form onSubmit={onLogInSubmit} noValidate>
                            <HeadText>Sign in</HeadText>
                            <Input
                                $invalid={!!loginErrors.email?.message}
                                type="email"
                                placeholder="Email"
                                {...loginRegister('email', {
                                    required: 'email is required',
                                })}
                            />
                            <InputErrorMessage>
                                {loginErrors.email?.message}
                            </InputErrorMessage>
                            <Input
                                $invalid={!!loginErrors.password?.message}
                                type="password"
                                placeholder="Password"
                                {...loginRegister('password', {
                                    required: 'email is required',
                                })}
                            />
                            <InputErrorMessage>
                                {loginErrors.password?.message}
                            </InputErrorMessage>
                            <ButtonGroup>
                                <Button type="submit">Sign In</Button>
                            </ButtonGroup>
                        </Form>
                    </LogInFormContainer>
                    <SignUpFormContainer variants={signUpFormVariants}>
                        <Form onSubmit={onSignUpSubmit} noValidate>
                            <HeadText>Create Account</HeadText>
                            <Input
                                $invalid={!!signUpErrors.name?.message}
                                type="text"
                                placeholder="Name"
                                {...signUpRegister('name', {
                                    required: 'Name is required',
                                })}
                            />
                            <InputErrorMessage>
                                {signUpErrors.name?.message}
                            </InputErrorMessage>
                            <Input
                                $invalid={!!signUpErrors.email?.message}
                                type="email"
                                placeholder="Email"
                                {...signUpRegister('email', {
                                    required: 'Email is required',
                                })}
                            />
                            <InputErrorMessage>
                                {signUpErrors.email?.message}
                            </InputErrorMessage>
                            <Input
                                $invalid={!!signUpErrors.password?.message}
                                type="password"
                                placeholder="Password"
                                {...signUpRegister('password', {
                                    required: 'password is required',
                                })}
                            />
                            <InputErrorMessage>
                                {signUpErrors.password?.message}
                            </InputErrorMessage>
                            <ButtonGroup>
                                <Button type="submit">Sign Up</Button>
                            </ButtonGroup>
                        </Form>
                    </SignUpFormContainer>

                    <OverlayContainer variants={overlayContainerVariants}>
                        <OverLay variants={overlayVariants}>
                            <OverlayLeftPanel variants={overlayLeftVariants}>
                                <HeadText>Welcome Back!</HeadText>
                                <ButtonGroup>
                                    <Button
                                        $outline
                                        onClick={() => setIsSignIn(true)}
                                    >
                                        Sign In
                                    </Button>
                                </ButtonGroup>
                            </OverlayLeftPanel>
                            <OverlayRightPanel variants={overlayRightVariants}>
                                <HeadText>Hello, Friend!</HeadText>
                                <ButtonGroup>
                                    <Button
                                        $outline
                                        onClick={() => setIsSignIn(false)}
                                    >
                                        Sign Up
                                    </Button>
                                </ButtonGroup>
                            </OverlayRightPanel>
                        </OverLay>
                    </OverlayContainer>
                </AuthCard>
            </FlexWrap>
        </Container>
    );
};

export default Auth;
