import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { CiTwitter, CiFacebook, CiInstagram } from 'react-icons/ci';
import { Col, Container, Row } from '../styles/global';
import device from '../styles/BreakPoints';

const FooterBrandWrap = styled.h3`
    font-family: sans-serif;
    font-size: 2rem;
    font-weight: 500;
    text-decoration: none;
    color: #3b5d50;
    margin-bottom: 1.5rem;
`;
const FooterTextWrap = styled.p`
    color: ${({ theme }) => theme.colors.text};
    font-family: sans-serif;
    font-size: 14px;
    margin-bottom: 1.5rem;
`;
const SocialLinkWrap = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
`;
const SocialLink = styled(Link)`
    margin-right: 0.8rem;
    width: 40px;
    height: 40px;
    text-align: center;
    display: inline-block;
    background: #dce5e4;
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FooterLinkWrap = styled.div`
    display: flex;
    flex-direction: column;
    @media ${device.lg} {
        margin-top: 61px;
    }
`;
const FooterLink = styled(Link)`
    color: ${({ theme }) => theme.colors.text};
    font-family: sans-serif;
    font-size: 14px;
    text-decoration: none;
    margin-bottom: 10px;
`;

const Footer = () => {
    return (
        <footer className="footer-section">
            <Container>
                <Row>
                    <Col $md={4}>
                        <FooterBrandWrap>NATORI</FooterBrandWrap>
                        <FooterTextWrap>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eaque accusantium eius voluptates, itaque
                            laudantium necessitatibus nisi pariatur voluptate.
                            Fuga, molestiae eum fugiat enim quae tempora qui
                            error. Voluptatem, provident dolorem!
                        </FooterTextWrap>

                        <SocialLinkWrap className="list-unstyled custom-social">
                            <SocialLink to="">
                                <CiFacebook size={20} />
                            </SocialLink>
                            <SocialLink to="">
                                <CiTwitter size={20} />
                            </SocialLink>
                            <SocialLink to="">
                                <CiInstagram size={20} />
                            </SocialLink>
                        </SocialLinkWrap>
                    </Col>
                </Row>

                <div className="border-top copyright">
                    <Row>
                        <Col>
                            <p className="mb-2 text-center text-lg-start">
                                Copyright &copy;2023. All Rights Reserved.
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
