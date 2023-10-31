import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    H3,
    ButtonGroup,
} from '../styles/global';
import useAxios from '../hooks/useAxios';
import { setLoading } from '../features/common/commonSlice';
import { useAppDispatch } from '../app/hooks';

const OrderTable = styled.table`
    margin-bottom: 3rem;
    width: 100%;
    border-collapse: collapse;
    & > tbody {
        border-top: 2px solid currentColor;
    }
    & th {
        text-align: start;
    }
    & tbody tr:not(:last-child) {
        border-bottom: 1px solid #dee2e6;
    }
    & th,
    & td {
        padding: 0.8rem 0.8rem;
    }
`;

const OrderBlock = styled.div`
    margin-bottom: 1.8rem;
    overflow: auto;
    & > h6 {
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: 22px;
    }

    & > .content {
        padding: 2rem;
    }
    &:not(:last-child) {
        border-bottom: 0.5px solid #dee2e6;
    }
`;

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
    totalQuantity: number;
    _id: string;
}

const OrderDetail = () => {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [order, setOrder] = useState<Order | null>(null);
    const { sendRequest: getOrderDetail } = useAxios();
    const backHandler = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(setLoading(true));
        getOrderDetail({
            url: `/api/order/${orderId}`,
            method: 'GET',
        })
            .then((res: AxiosResponse) => {
                const detail = res.data;
                setOrder(detail);
            })
            .finally(() => dispatch(setLoading(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container>
            <Row>
                <Col>
                    <H3>Your Order</H3>
                    <Card>
                        <OrderBlock>
                            <h6>Shipping Address: </h6>
                            <div className="content">
                                {order?.shippingAddress.postalCode}
                                {order?.shippingAddress.city}
                                {order?.shippingAddress.district}
                                {order?.shippingAddress.address}
                            </div>
                        </OrderBlock>
                        <OrderBlock>
                            <h6>Summary: </h6>
                            <div className="content">
                                <OrderTable>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.orderItems.map(
                                            (item, index) => {
                                                return (
                                                    <tr key={item.product._id}>
                                                        <td>
                                                            {item.product.name}
                                                        </td>
                                                        <td>
                                                            <strong className="mx-2">
                                                                x
                                                            </strong>{' '}
                                                            {item.quantity}
                                                        </td>
                                                        <td>
                                                            $
                                                            {item.price *
                                                                item.quantity}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}

                                        <tr>
                                            <td>
                                                <strong>Order Total</strong>
                                            </td>
                                            <td>
                                                <strong>
                                                    {order?.totalQuantity}
                                                </strong>{' '}
                                                items
                                            </td>
                                            <td>
                                                <strong>
                                                    ${order?.totalPrice}
                                                </strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </OrderTable>
                            </div>
                        </OrderBlock>
                    </Card>
                    <ButtonGroup>
                        <Button onClick={backHandler}>Back To History</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderDetail;
