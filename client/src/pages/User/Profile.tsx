import { styled } from 'styled-components';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../app/hooks';

import {
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    Input,
    Row,
    InputErrorMessage,
} from '../../styles/global';
import useAxios from '../../hooks/useAxios';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { setLoading } from '../../features/common/commonSlice';

const FormGroup = styled.div`
    & > label {
        color: inherit;
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};
        position: relative;
        margin-bottom: 0.6em !important;
        margin-top: 0.6em !important;
    }
    & > input,
    & > p {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text};
    }
`;

const schema = yup.object().shape({
    name: yup.string().required('Username is required'),
    email: yup
        .string()
        .email('Email format is not valid')
        .required('Email is required'),
    password: yup.string().when({
        is: (password: string) => {
            return !!password;
        },
        then: (s) =>
            s
                .min(6, 'password need least 6 characters')
                .matches(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/,
                    'password need at least one digit, one lowercase letter, one uppercase letter, one special character, no space'
                ),
        otherwise: (s) => s.nullable(),
    }),
    passwordConfirm: yup.string().when(['password'], {
        is: (passwordConfirm: string) => {
            return !!passwordConfirm;
        },
        then: (s) =>
            s
                .min(6, 'password need least 6 characters')
                .matches(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/,
                    'password need at least one digit, one lowercase letter, one uppercase letter, one special character, no space'
                )
                .oneOf([yup.ref('password')], 'passwords do not match'),
        otherwise: (s) => s.nullable(),
    }),
});

const Profile = () => {
    const dispatch = useAppDispatch();
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        resolver: yupResolver(schema),
    });

    const { register, control, handleSubmit, formState, reset } = form;

    const { errors } = formState;

    const { sendRequest } = useAxios();

    useEffect(() => {
        sendRequest({
            url: `/api/user/profile`,
            method: 'GET',
        })
            .then((res: AxiosResponse) => {
                const { name, email } = res.data;
                reset({
                    name,
                    email,
                });
            })
            .finally(() => dispatch(setLoading(false)));
    }, []);
    const onSubmit = async (data: any) => {
        const rqData = {
            ...data,
        };
        sendRequest({
            url: `/api/user/profile`,
            method: 'PUT',
            data: rqData,
        })
            .then((res: AxiosResponse) => {
                const { name, email } = res.data;
                reset({
                    name,
                    email,
                    password: '',
                    passwordConfirm: '',
                });
            })
            .finally(() => dispatch(setLoading(false)));
    };
    return (
        <>
            {/* {requestError && (
                <Modal.Root>
                    <Modal.Header handleClose={resetError}>Error</Modal.Header>
                    <Modal.Body>
                        <p>{requestError}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={resetError}>Confirm</Button>
                    </Modal.Footer>
                </Modal.Root>
            )}
            {isLoading && <Loader />} */}
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                    <label htmlFor="name">Full Name</label>
                                    <Input type="text" {...register('name')} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="email">Email</label>
                                    <Input type="text" {...register('email')} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        {...register('password')}
                                    />
                                    <InputErrorMessage>
                                        {errors.password?.message}
                                    </InputErrorMessage>
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="passwordConfirm">
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        {...register('passwordConfirm')}
                                    />
                                    <InputErrorMessage>
                                        {errors.passwordConfirm?.message}
                                    </InputErrorMessage>
                                </FormGroup>

                                <ButtonGroup>
                                    <Button type="submit">Save Changes</Button>
                                </ButtonGroup>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Profile;
