import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsBagCheck } from 'react-icons/bs';
import {
    Container,
    Row,
    Col,
    Card,
    ButtonGroup,
    Button,
    H2,
} from '../styles/global';

const FlexColumnCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: 1.2rem;
`;

const ButtonGroupCenter = styled(ButtonGroup)`
    padding-top: 1.6rem;
    justify-content: center;
    & button {
        flex: 1;
        justify-content: center;
    }
`;
const RowCenter = styled(Row)`
    justify-content: center;
`;

const OrderCompleted = () => {
    const { state } = useLocation();
    const { orderId } = state;

    const navigate = useNavigate();

    const continueShoppingHandler = () => {
        navigate('/');
    };
    const orderDetailHandler = () => {
        navigate(`/user/orders/${orderId}`);
    };
    return (
        <Container>
            <RowCenter>
                <Col $md={6}>
                    <Card>
                        <FlexColumnCenter>
                            <BsBagCheck size={70} />

                            <H2>Success</H2>
                            <p>We received your purchase request;</p>
                        </FlexColumnCenter>
                        <ButtonGroupCenter>
                            <Button onClick={orderDetailHandler}>
                                Order Detail
                            </Button>
                            <Button $outline onClick={continueShoppingHandler}>
                                Continue Shopping
                            </Button>
                        </ButtonGroupCenter>
                    </Card>
                </Col>
            </RowCenter>
        </Container>
    );
};

export default OrderCompleted;
