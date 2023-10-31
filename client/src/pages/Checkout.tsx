import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
    Card,
    Col,
    Container,
    Input,
    Row,
    Button,
    InputErrorMessage,
    Select,
    ButtonGroup,
} from '../styles/global';
import useAxios from '../hooks/useAxios';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    clearAllProduct,
    getMemoizedTotalPrice,
    getMemoizedTotalQuantity,
    selectCartItems,
} from '../features/cart/cartSlice';
import { setLoading } from '../features/common/commonSlice';

const BlockTitle = styled.h5`
    font-size: 1.75rem;
    margin-bottom: 1rem;
`;

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

interface ShippingForm {
    shippingAddress: {
        postalCode: string;
        city: string;
        district: string;
        address: string;
    };
}

const schema = yup.object({
    shippingAddress: yup.object({
        postalCode: yup.string().required(),
        city: yup.string().required('city is required'),
        district: yup.string().required('district is required'),
        address: yup.string().required('address is required'),
    }),
});

interface PlaceOrderResponse {
    message: string;
    orderId: string;
}
interface City {
    _id: string;
    name: string;
    districts: District[];
}
interface District {
    name: string;
    zip: string;
}

const Checkout = () => {
    const [cityDropdowns, setCityDropdowns] = useState<City[]>([]);
    const [selectedCity, setselectedCity] = useState<City>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(getMemoizedTotalPrice);
    const totalQuantity = useAppSelector(getMemoizedTotalQuantity);

    const form = useForm<ShippingForm>({
        defaultValues: {
            shippingAddress: {
                postalCode: '',
                city: '',
                district: '',
                address: '',
            },
        },
        resolver: yupResolver(schema),
    });

    const { register, handleSubmit, formState, setValue } = form;

    const { errors } = formState;

    function handleCountryChange(event: any) {
        const cityName = event.target.value;
        const cityObj = cityDropdowns.find((item) => item.name === cityName);
        setValue('shippingAddress.district', '');
        setValue('shippingAddress.postalCode', '');
        setselectedCity(cityObj);
    }

    function handleStateChange(event: any) {
        const districtName = event.target.value;
        const districtObj = selectedCity?.districts.find(
            (item) => item.name === districtName
        );
        if (districtName && districtObj) {
            setValue('shippingAddress.postalCode', districtObj.zip);
        } else {
            setValue('shippingAddress.postalCode', '');
        }
    }

    const { sendRequest } = useAxios();

    useEffect(() => {
        dispatch(setLoading(true));
        sendRequest({
            url: `/api/dropdown/city`,
            method: 'GET',
        })
            .then((res: AxiosResponse) => {
                const { cityDropdowns } = res.data;
                setCityDropdowns(cityDropdowns);
            })
            .finally(() => dispatch(setLoading(false)));
    }, []);

    const onSubmit = async (data: ShippingForm) => {
        dispatch(setLoading(true));
        const rqData = {
            ...data,
            cartItems,
            totalPrice,
            totalQuantity,
        };
        sendRequest({
            url: `/api/order`,
            method: 'POST',
            data: rqData,
        })
            .then((res: AxiosResponse<PlaceOrderResponse>) => {
                const { orderId } = res.data;
                dispatch(clearAllProduct());
                localStorage.removeItem('cartItems');
                navigate(`/order_completed`, {
                    state: { orderId },
                    replace: true,
                });
            })
            .finally(() => dispatch(setLoading(false)));
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <BlockTitle>Billing Details</BlockTitle>
                        <Card>
                            <Row>
                                <Col $md={4}>
                                    <label htmlFor="city">
                                        City <span>*</span>
                                    </label>
                                    <Select
                                        {...register('shippingAddress.city')}
                                        onChange={(e) => handleCountryChange(e)}
                                    >
                                        <option value="">select city</option>
                                        {cityDropdowns?.map((item) => {
                                            return (
                                                <option
                                                    key={item._id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                    <InputErrorMessage>
                                        {errors.shippingAddress?.city?.message}
                                    </InputErrorMessage>
                                </Col>
                                <Col $md={4}>
                                    <label htmlFor="district">
                                        District <span>*</span>
                                    </label>
                                    <Select
                                        {...register(
                                            'shippingAddress.district'
                                        )}
                                        onChange={(e) => handleStateChange(e)}
                                    >
                                        <option value="">
                                            select district
                                        </option>
                                        {selectedCity?.districts.map((item) => {
                                            return (
                                                <option
                                                    key={item.name}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                    <InputErrorMessage>
                                        {
                                            errors.shippingAddress?.district
                                                ?.message
                                        }
                                    </InputErrorMessage>
                                </Col>
                                <Col $md={4}>
                                    <label htmlFor="postalCode">
                                        Postal Code
                                    </label>
                                    <Input
                                        readOnly
                                        type="text"
                                        {...register(
                                            'shippingAddress.postalCode'
                                        )}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col $md={12}>
                                    <label htmlFor="address">
                                        Address <span>*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        {...register('shippingAddress.address')}
                                        placeholder="Street address"
                                    />
                                    <InputErrorMessage>
                                        {
                                            errors.shippingAddress?.address
                                                ?.message
                                        }
                                    </InputErrorMessage>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BlockTitle>Your Order</BlockTitle>
                        <Card>
                            <OrderTable>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <strong className="mx-2">
                                                        x
                                                    </strong>{' '}
                                                    {item.cartQuantity}
                                                </td>
                                                <td>
                                                    $
                                                    {item.price *
                                                        item.cartQuantity}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    <tr>
                                        <td>
                                            <strong>Order Total</strong>
                                        </td>
                                        <td>
                                            <strong>{totalQuantity}</strong>{' '}
                                            items
                                        </td>
                                        <td>
                                            <strong>${totalPrice}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </OrderTable>

                            <ButtonGroup>
                                <Button $block type="submit">
                                    Place Order
                                </Button>
                            </ButtonGroup>
                        </Card>
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

export default Checkout;
