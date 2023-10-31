import { FaSearch } from 'react-icons/fa';

import { KeyboardEvent, useRef } from 'react';
import styled from 'styled-components';
import { Input } from '../styles/global';

interface Props {
    onSearchHandler: (search?: string) => void;
    onChangeHandler: (search?: string) => void;
    searchValue: string;
}

const SearchWrap = styled.div`
    width: 100%;
    position: relative;
    display: flex;
`;
const SearchInput = styled(Input)`
    border-width: 3px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.primary};
    border-right: none;
    border-radius: 5px 0 0 5px;
    outline: none;
    margin: 0;
    font-size: 1.2rem;
`;

const SearchButton = styled.button`
    width: 40px;
    background: ${({ theme }) => theme.colors.primary};
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
`;

const SearchBar: React.FC<Props> = ({
    searchValue,
    onSearchHandler,
    onChangeHandler,
}) => {
    const searchInput = useRef<HTMLInputElement>(null);
    const handleChange = () => {
        const search = searchInput.current?.value;
        onSearchHandler(search);
    };

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const search = searchInput.current?.value;
            onSearchHandler(search);
        }
    };

    return (
        <SearchWrap>
            <SearchInput
                type="text"
                ref={searchInput}
                value={searchValue}
                onChange={() => onChangeHandler(searchInput.current?.value)}
                onKeyDown={(e) => handleEnter(e)}
            />
            <SearchButton type="button" onClick={handleChange}>
                <FaSearch />
            </SearchButton>
        </SearchWrap>
    );
};

export default SearchBar;
