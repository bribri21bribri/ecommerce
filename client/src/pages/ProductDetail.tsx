import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Button, Col, Container, Row, H4, H5 } from '../styles/global';
import useAxios from '../hooks/useAxios';
import { useAppDispatch } from '../app/hooks';
import { addProduct } from '../features/cart/cartSlice';
import Loader from '../components/Loader';
import {
    setLoading,
    ModalType,
    setModal,
} from '../features/common/commonSlice';

const ProductImg = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

const ProductInfoBlock = styled.div`
    margin-bottom: 1rem;
`;
const ProductTitle = styled(H4)`
    margin-bottom: 1rem;
`;
const CounterBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
`;

const CounterWrap = styled.div`
    border: 1px solid #edebeb;
    border-radius: 6px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
`;

const CounterBtn = styled(Button)`
    &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    &.disabled {
        background-color: #aec3ae;
    }
`;

type Product = {
    _id: string;
    name: string;
    price: number;
    desc: string;
    imageURL: string;
};

interface ProductsDetailResponse {
    product: Product;
}

const ProductDetail = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [productDetail, setProductDetail] = useState<Product | null>(null);
    const dispatch = useAppDispatch();

    const { sendRequest } = useAxios();

    useEffect(() => {
        dispatch(setLoading(true));
        sendRequest({
            url: `/api/products/${id}`,
            method: 'GET',
        })
            .then((res: AxiosResponse<ProductsDetailResponse>) => {
                const { product } = res.data;
                setProductDetail(product);
            })
            .finally(() => dispatch(setLoading(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const quantityChange = (q: number) => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + q;
            if (newQuantity <= 1) {
                return 1;
            }
            return newQuantity;
        });
    };

    const handleAddToCart = (product: Product) => {
        const productPayload = {
            ...product,
            cartQuantity: quantity,
        };
        dispatch(addProduct(productPayload));
        dispatch(
            setModal({
                title: `Added to cart`,
                message: `${product.name} $${product.price} x ${quantity}`,
                type: ModalType.success,
            })
        );
    };

    return (
        <>
            {/* {isLoading && <Loader />} */}
            {productDetail && (
                <Container>
                    <Row>
                        <Col>
                            <ProductImg src={productDetail.imageURL} />
                        </Col>
                        <Col>
                            <ProductInfoBlock>
                                <ProductTitle>
                                    {productDetail.name}
                                </ProductTitle>

                                <H5>${productDetail.price}</H5>
                            </ProductInfoBlock>
                            <p>{productDetail.desc}</p>

                            <CounterBlock>
                                <H5>Quantity</H5>
                                <CounterWrap>
                                    <CounterBtn
                                        className={
                                            quantity <= 1 ? 'disabled' : ''
                                        }
                                        disabled={quantity <= 1}
                                        onClick={() => quantityChange(-1)}
                                    >
                                        -
                                    </CounterBtn>
                                    <div>{quantity}</div>
                                    <CounterBtn
                                        onClick={() => quantityChange(1)}
                                    >
                                        +
                                    </CounterBtn>
                                </CounterWrap>
                            </CounterBlock>
                            <Button
                                onClick={() => handleAddToCart(productDetail)}
                            >
                                Add to Cart
                            </Button>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default ProductDetail;
