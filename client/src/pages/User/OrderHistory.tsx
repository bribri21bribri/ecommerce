import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosResponse } from 'axios';
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    Input,
    Row,
} from '../../styles/global';
import Pagination from '../../components/Pagination';
import useAxios from '../../hooks/useAxios';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import { setLoading } from '../../features/common/commonSlice';
import { useAppDispatch } from '../../app/hooks';

export const STable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    border-radius: 0.25rem;
    overflow: hidden;
`;

export const STHead = styled.thead`
    background: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const STH = styled.th`
    font-weight: normal;
    padding: 1rem;
    color: #fff;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 14px;
`;

export const STBody = styled.tbody``;

export const STBodyTR = styled.tr`
    &:nth-child(2n) {
        background: ${({ theme }) => theme.colors.background};
    }
    &:nth-child(2n + 1) {
        background: #fff;
    }
`;

export const STD = styled.td`
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    font-size: 14px;
`;

const FormGroup = styled.div`
    position: relative;
    /* margin-bottom: 1em;
    margin-top: 2em; */

    & > label {
        color: inherit;
        display: block;
        font-size: 1em;
        position: relative;
        margin-bottom: 0.6em !important;
        margin-top: 0.6em !important;
    }
    & .react-datepicker-wrapper {
        width: 100%;
    }
`;

const DateInput = styled(Input)`
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    outline: none;
    margin: 0;
    ${({ $invalid }) => {
        return (
            $invalid &&
            css`
                border-color: rgb(191, 22, 80);
            `
        );
    }}
`;

interface DateForm {
    startDate: Date | null;
    endDate: Date | null;
}

interface Order {
    createdAt: string;
    isDelivered: false;
    orderItems: any[];
    shippingAddress: {
        postalCode: string;
        city: string;
        district: string;
        address: string;
    };
    totalPrice: number;
    _id: string;
}
interface Response {
    ordersHistory: Order[];
    countHistory: number;
}

const schema = yup.object({
    startDate: yup.date().nullable(),
    endDate: yup.date().nullable(),
});

const OrderHistory = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { sendRequest } = useAxios();
    const [pageOrders, setPageOrders] = useState<Order[]>([]);
    const [orderCount, setOrderCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchDate, setCurrentSearchDate] = useState<DateForm>({
        startDate: null,
        endDate: null,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            startDate: currentSearchDate.startDate,
            endDate: currentSearchDate.endDate,
        },
        resolver: yupResolver(schema),
    });

    const getOrderHistory = (params: {
        page: number;
        startDate: Date | null;
        endDate: Date | null;
    }) => {
        const { page = 1, startDate, endDate } = params;
        if (startDate) {
            startDate.setHours(0, 0, 0, 0);
        }
        const startDateQuery = startDate
            ? `&startDate=${startDate.toISOString()}`
            : '';
        if (endDate) {
            endDate.setHours(23, 59, 59, 999);
        }
        const endDateDateQuery = endDate
            ? `&endDate=${endDate.toISOString()}`
            : '';
        dispatch(setLoading(true));
        sendRequest({
            url: `/api/order/history?page=${page}${startDateQuery}${endDateDateQuery}`,
            method: 'GET',
        })
            .then((res: AxiosResponse) => {
                const { ordersHistory = [], countHistory = 0 } = res.data;
                setPageOrders(ordersHistory);
                setOrderCount(countHistory);
            })
            .finally(() => dispatch(setLoading(false)));
    };

    const onSubmit = (data: any) => {
        setCurrentSearchDate(() => {
            return {
                endDate: data.endDate,
                startDate: data.startDate,
            };
        });
        setCurrentPage(1);
        getOrderHistory({
            page: 1,
            endDate: data.endDate,
            startDate: data.startDate,
        });
    };

    const pageChangeHandler = (newPage: number) => {
        setCurrentPage(newPage);
        setValue('startDate', currentSearchDate.startDate);
        setValue('endDate', currentSearchDate.endDate);
        getOrderHistory({
            page: newPage,
            startDate: currentSearchDate.startDate,
            endDate: currentSearchDate.endDate,
        });
    };

    const detaliHandler = (orderId: string) => {
        navigate(`/user/orders/${orderId}`);
    };

    useEffect(() => {
        getOrderHistory({
            page: 1,
            startDate: currentSearchDate.startDate,
            endDate: currentSearchDate.endDate,
        });
    }, []);
    return (
        <Container>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col $md={3}>
                                <FormGroup>
                                    <label htmlFor="startDate">
                                        Start Date
                                    </label>
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                        }) => {
                                            return (
                                                <ReactDatePicker
                                                    customInput={
                                                        <DateInput
                                                            $invalid={
                                                                !!errors
                                                                    .startDate
                                                                    ?.message
                                                            }
                                                        />
                                                    }
                                                    onChange={onChange}
                                                    selected={value}
                                                    placeholderText="select date"
                                                />
                                            );
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col $md={3}>
                                <FormGroup>
                                    <label htmlFor="endDate">End Date</label>
                                    <Controller
                                        name="endDate"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                        }) => {
                                            return (
                                                <ReactDatePicker
                                                    customInput={
                                                        <DateInput
                                                            $invalid={
                                                                !!errors.endDate
                                                                    ?.message
                                                            }
                                                        />
                                                    }
                                                    onChange={onChange}
                                                    selected={value}
                                                    placeholderText="select date"
                                                />
                                            );
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col $md={6}>
                                <ButtonGroup>
                                    <Button type="submit" $block>
                                        Search
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <STable>
                            <STHead>
                                <tr>
                                    <STH>Date</STH>
                                    <STH>Price</STH>
                                    {/* <STH>Status</STH> */}
                                    <STH>Action</STH>
                                </tr>
                            </STHead>
                            <STBody>
                                {pageOrders.map((item, index) => (
                                    <STBodyTR key={item._id}>
                                        <STD>{item.createdAt}</STD>
                                        <STD>${item.totalPrice}</STD>
                                        {/* <STD>{item.isDelivered}</STD> */}
                                        <STD>
                                            <Button
                                                onClick={() =>
                                                    detaliHandler(item._id)
                                                }
                                            >
                                                Detail
                                            </Button>
                                        </STD>
                                    </STBodyTR>
                                ))}
                            </STBody>
                        </STable>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Pagination
                    onPageChange={pageChangeHandler}
                    totalCount={orderCount}
                    currentPage={currentPage}
                    pageSize={10}
                />
            </Row>
        </Container>
    );
};

export default OrderHistory;
