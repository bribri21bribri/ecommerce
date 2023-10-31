import { styled } from 'styled-components';
import { MdDeleteOutline } from 'react-icons/md';
import { BsFillCartXFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    ButtonGroup,
    Card,
    H4,
} from '../styles/global';
import device from '../styles/BreakPoints';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    CartProduct,
    addProduct,
    decreaseProduct,
    getMemoizedTotalPrice,
    getMemoizedTotalQuantity,
    removeProduct,
    selectCartItems,
} from '../features/cart/cartSlice';

const CartItem = styled.div`
    padding: 1rem 0;
    margin-top: 0.5rem;
    &:not(:last-child) {
        border-bottom: 1px solid #edebeb;
    }
`;
const CartItemImg = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

const CartItemHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    @media ${device.md} {
        margin-top: 0;
    }
`;

const CartItemTitle = styled.h5`
    font-size: 1.4rem;
`;
const CartItemPrice = styled.h5`
    font-size: 1.25rem;
`;

const QuantityBtnWrap = styled.div`
    border: 1px solid #edebeb;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;
const CardBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AmountBtn = styled.button`
    font-size: 1.2rem;
    font-weight: 500;
    height: 100%;
    padding: 0.6rem;
`;

const FlexColumnCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: 1.2rem;
`;

const Cart = () => {
    const cartItems = useAppSelector(selectCartItems);
    const totalQuantity = useAppSelector(getMemoizedTotalQuantity);
    const totalPrice = useAppSelector(getMemoizedTotalPrice);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const decreaseCartQuantity = (product: CartProduct) => {
        const payload = {
            ...product,
            cartQuantity: -1,
        };
        dispatch(decreaseProduct(payload));
    };
    const addCartQuantity = (product: CartProduct) => {
        const payload = {
            ...product,
            cartQuantity: 1,
        };
        dispatch(addProduct(payload));
    };
    const removeProductFromCart = (product: CartProduct) => {
        dispatch(removeProduct(product));
    };
    const goCheckout = () => {
        navigate(`/checkout`);
    };
    return (
        <Container>
            <Row>
                <Col $lg={8} $md={7}>
                    <Card>
                        {cartItems.length ? (
                            cartItems.map((item, index) => (
                                <CartItem key={item._id}>
                                    <Row>
                                        <Col $lg={3}>
                                            <CartItemImg src={item.imageURL} />
                                        </Col>
                                        <Col $lg={9}>
                                            <CartItemHead>
                                                <CartItemTitle>
                                                    {item.name}
                                                </CartItemTitle>
                                                <QuantityBtnWrap>
                                                    <AmountBtn
                                                        onClick={() =>
                                                            decreaseCartQuantity(
                                                                item
                                                            )
                                                        }
                                                        className="btn-quantity"
                                                    >
                                                        &minus;
                                                    </AmountBtn>
                                                    <span className="p-quantiry">
                                                        {item.cartQuantity}
                                                    </span>
                                                    <AmountBtn
                                                        onClick={() =>
                                                            addCartQuantity(
                                                                item
                                                            )
                                                        }
                                                        className="btn-quantity"
                                                    >
                                                        +
                                                    </AmountBtn>
                                                </QuantityBtnWrap>
                                            </CartItemHead>
                                            <CardBlock>
                                                <ButtonGroup>
                                                    <Button
                                                        $outline
                                                        onClick={() =>
                                                            removeProductFromCart(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <MdDeleteOutline />
                                                        <span>
                                                            {' '}
                                                            Remove Item
                                                        </span>
                                                    </Button>
                                                    {/* <Button $outline>
                                                    <MdOutlineFavoriteBorder />
                                                    <span>
                                                        {' '}
                                                        Move To Wish List
                                                    </span>
                                                </Button> */}
                                                </ButtonGroup>
                                                <CartItemPrice>
                                                    $
                                                    {item.cartQuantity *
                                                        item.price}
                                                </CartItemPrice>
                                            </CardBlock>
                                        </Col>
                                    </Row>
                                </CartItem>
                            ))
                        ) : (
                            <FlexColumnCenter>
                                <BsFillCartXFill size={90} />
                                <H4>Cart Is Empty</H4>
                            </FlexColumnCenter>
                        )}
                    </Card>
                </Col>
                <Col $lg={4} $md={5}>
                    <Row className="gap-3">
                        <Col>
                            <Card className="card">
                                <h4>Order Summary</h4>
                                <div className="store-item mt-2">
                                    <Row>
                                        <Col>
                                            <CardBlock>
                                                <p>Total Quantity</p>
                                                <p>
                                                    <b>{totalQuantity}</b> items
                                                </p>
                                            </CardBlock>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <CardBlock>
                                                <p>
                                                    The total amount of
                                                    {/* (Including VAT) */}
                                                </p>
                                                <p>
                                                    <b>${totalPrice}</b>
                                                </p>
                                            </CardBlock>
                                        </Col>
                                        {/* <Col>
                      </Col> */}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button onClick={goCheckout} $block>
                                                Go To Checkout
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
