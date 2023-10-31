import { styled } from 'styled-components';
import { DOTS, usePagination } from '../hooks/usePagination';

const PagesWrap = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 5rem;
    margin-bottom: 3rem;
`;
const Pages = styled.ul`
    display: flex;
`;
const PageItem = styled.li`
    &:first-child > button {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    &:last-child > button {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;
const PageBtn = styled.button`
    position: relative;
    display: block;
    padding: 6px 12px;
    font-size: 1rem;
    text-decoration: none;
    border: 1px solid #6a6a6a;
`;

interface Props {
    onPageChange: (page: any) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
}

const Pagination: React.FC<Props> = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <PagesWrap>
            <Pages>
                {/* previous page */}
                <PageItem>
                    <PageBtn
                        disabled={currentPage === 1}
                        className={currentPage === 1 ? 'disabled' : ''}
                        onClick={onPrevious}
                    >
                        <span>&laquo;</span>
                    </PageBtn>
                </PageItem>
                {/* page select */}
                {paginationRange.map((pageNumber, i) => {
                    if (pageNumber === DOTS) {
                        return (
                            <PageItem key={i}>
                                <PageBtn disabled>&#8230;</PageBtn>
                            </PageItem>
                        );
                    }

                    return (
                        <PageItem key={i}>
                            <PageBtn
                                disabled={pageNumber === currentPage}
                                className={
                                    pageNumber === currentPage ? 'selected' : ''
                                }
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </PageBtn>
                        </PageItem>
                    );
                })}
                {/* next page */}
                <PageItem>
                    <PageBtn
                        disabled={currentPage === lastPage}
                        className={currentPage === lastPage ? 'disabled' : ''}
                        onClick={onNext}
                    >
                        <span>&raquo;</span>
                    </PageBtn>
                </PageItem>
            </Pages>
        </PagesWrap>
    );
};

export default Pagination;
