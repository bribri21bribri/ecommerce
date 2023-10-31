import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AxiosResponse } from 'axios';
import { Button, Col, Container, Row } from '../styles/global';
import Pagination from '../components/Pagination';
import useAxios from '../hooks/useAxios';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { useAppDispatch } from '../app/hooks';
import { setLoading } from '../features/common/commonSlice';

const ProductImg = styled.img`
    max-width: 100%;
    height: auto;
`;
const ProductTitle = styled.h5`
    font-size: 14px;
    font-weight: bold;
    flex-basis: 75%;
`;
const ProductPrice = styled.span`
    font-size: 8px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
`;

const ProdCardWrap = styled.div`
    display: flex;
    justify-content: center;
`;
const ProdCard = styled.div`
    background-color: #fff;
    border: none;
    border-radius: 10px;
    width: 240px;
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);

    display: block;
    cursor: pointer;
`;
const ImgWrap = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
`;

const InfoWrap = styled.div`
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
`;

const TopWrap = styled.div`
    position: absolute;
    width: 100%;
    padding: 9px;
    display: flex;
    justify-content: end;
    align-items: center;
`;

const WishBtn = styled.button`
    width: 1.6rem;
    height: 1.6rem;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Product {
    _id: string;
    name: string;
    desc: string;
    imageURL: string;
    price: number;
    tag: string;
}

interface ProductsResponse {
    countProducts: number;
    products: Product[];
}

const Products: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [countProducts, setCountProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearch, setCurrentSearch] = useState('');
    const [currentTags, setcurrentTags] = useState<string[]>([]);

    const { sendRequest } = useAxios();

    useEffect(() => {
        dispatch(setLoading(true));
        sendRequest({
            url: `/api/products`,
            method: 'GET',
        })
            .then((res: AxiosResponse) => {
                const { products, countProducts } = res.data;
                setProducts(products);
                setCountProducts(countProducts);
            })
            .finally(() => dispatch(setLoading(false)));
    }, []);

    const feachProducts = (params: {
        page: number;
        search: string;
        tags: string[];
    }) => {
        const { page, search, tags } = params;
        dispatch(setLoading(true));
        sendRequest({
            url: `/api/products?page=${page}&search=${search}`,
            method: 'GET',
        })
            .then((res: AxiosResponse<ProductsResponse>) => {
                const { products, countProducts } = res.data;
                setProducts(products);
                setCountProducts(countProducts);
            })
            .finally(() => dispatch(setLoading(false)));
    };

    const pageChangeHandler = (newPage: number) => {
        setCurrentPage(newPage);
        feachProducts({
            page: newPage,
            search: currentSearch,
            tags: currentTags,
        });
    };
    const searchHandler = (newSearch?: string) => {
        setCurrentSearch(newSearch || '');
        feachProducts({
            page: 1,
            search: newSearch || '',
            tags: currentTags,
        });
    };

    const goProductDetail = (id: string) => {
        navigate(`/product_detail/${id}`);
    };

    return (
        <>
            {/* {error && (
                <Modal.Root>
                    <Modal.Header handleClose={resetError}>Error</Modal.Header>
                    <Modal.Body>
                        <p>{error}</p>
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
                        <SearchBar
                            searchValue={currentSearch}
                            onSearchHandler={searchHandler}
                            onChangeHandler={(val) =>
                                setCurrentSearch(val || '')
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    {products?.map((item, index) => {
                        return (
                            <Col key={item._id} $sm={6} $md={4} $lg={3}>
                                <ProdCardWrap>
                                    <ProdCard
                                        onClick={() =>
                                            goProductDetail(item._id)
                                        }
                                    >
                                        <ImgWrap>
                                            <TopWrap>
                                                {/* <WishBtn>
                                                <MdOutlineFavoriteBorder
                                                    size={16}
                                                />
                                            </WishBtn> */}
                                            </TopWrap>
                                            <ProductImg src={item.imageURL} />
                                        </ImgWrap>
                                        <InfoWrap>
                                            <ProductTitle>
                                                {item.name}
                                            </ProductTitle>

                                            <ProductPrice>
                                                ${item.price}
                                            </ProductPrice>
                                        </InfoWrap>
                                    </ProdCard>
                                </ProdCardWrap>
                            </Col>
                        );
                    })}
                </Row>

                <Row>
                    <Pagination
                        onPageChange={pageChangeHandler}
                        totalCount={countProducts}
                        currentPage={currentPage}
                        pageSize={10}
                    />
                </Row>
            </Container>
        </>
    );
};

export default Products;
