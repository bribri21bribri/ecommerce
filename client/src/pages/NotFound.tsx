import { MdErrorOutline } from 'react-icons/md';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Col,
    Card,
    H2,
    Button,
    Row,
    ButtonGroup,
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

const NotFound = () => {
    const navigate = useNavigate();
    const continueShoppingHandler = () => {
        navigate('/');
    };
    return (
        <Container>
            <RowCenter>
                <Col $md={6}>
                    <Card>
                        <FlexColumnCenter>
                            <MdErrorOutline size={70} />

                            <H2>404 Not Found</H2>
                            <p>requested page does not exit</p>
                        </FlexColumnCenter>
                        <ButtonGroupCenter>
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

export default NotFound;
