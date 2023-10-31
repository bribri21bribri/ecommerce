import styled, { createGlobalStyle, css } from 'styled-components';
import device from './BreakPoints';

export const GlobalStyle = createGlobalStyle`
  *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Open Sans', sans-serif; 
  }
  body {
    font-family: sans-serif;
    font-weight: 400;
    color: #6a6a6a;
    font-size: 14px;
    background-color: ${({ theme }) => theme.colors.background};
  }
  ol, ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  button {
    padding: 0;
    border: none;
    background: none;
  }
`;
export const Container = styled.div<{ $fluid?: boolean }>`
    width: 100%;
    max-width: ${(props) => (props.$fluid ? '100%' : '1200px')};
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -15px;
`;

export const ButtonGroup = styled.div`
    /* margin-top: 1rem;
    margin-bottom: 1rem; */
    padding: 1rem 0;
    display: flex;
    gap: 0.5rem;
`;

export const Button = styled.button<{
    $variant?: string;
    $outline?: boolean;
    $block?: boolean;
}>`
    --color: ${({ theme, $variant }) => {
        if (!$variant || !theme.colors[$variant]) {
            return theme.colors.primary;
        }
        return theme.colors[$variant];
    }};
    box-sizing: border-box;
    font-family: inherit;
    padding: 0.6rem 0.8rem;
    border-radius: 4px;
    border: 1px solid var(--color);
    background-color: ${({ $outline }) => {
        return $outline ? '#FFF' : css`var(--color)`;
    }};
    color: ${({ $outline }) => {
        return $outline ? css`var(--color)` : '#FFF';
    }};
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    ${({ $block }) => {
        if ($block) {
            return css`
                display: block;
                width: 100%;
            `;
        }
        return '';
    }}

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const H5 = styled.h5`
    font-size: 22px;
    font-weight: 500;
`;
export const H4 = styled.h4`
    font-size: 26px;
    font-weight: 500;
`;
export const H3 = styled.h3`
    font-size: 30px;
    font-weight: 600;
`;
export const H2 = styled.h2`
    font-size: 36px;
    font-weight: 700;
`;
export const H1 = styled.h1`
    font-size: 40px;
    font-weight: 800;
`;

export const Card = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #edebeb;
`;

export const Input = styled.input<{ $invalid?: boolean }>`
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    ${({ $invalid }) => {
        return (
            $invalid &&
            css`
                border: 1px solid red;
            `
        );
    }}
`;
export const Select = styled.select<{ $invalid?: boolean }>`
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    ${({ $invalid }) => {
        return (
            $invalid &&
            css`
                border: 1px solid red;
            `
        );
    }}
`;

export const InputErrorMessage = styled.div`
    color: red;
    font-size: 12px;
    text-align: left;
`;

function getWidthString(span: number) {
    const width = (span / 12) * 100;
    return `${width}%`;
}

interface ColProps {
    $sm?: number;
    $md?: number;
    $lg?: number;
}

const colFlexMixin = css<ColProps>`
    flex: ${({ $sm, $md, $lg }) => ($sm || $md || $lg ? '0 0 auto' : '1 0 0%')};
`;

export const Col = styled.div<{ $sm?: number; $md?: number; $lg?: number }>`
    padding: 15px;
    max-width: 100%;
    // overwrite flex if specified sm, md, lg
    ${colFlexMixin}
    // overwrite width if specified sm, md, lg
  width: 100%;

    @media ${device.sm} {
        width: ${({ $sm }) => $sm && getWidthString($sm)};
    }
    @media ${device.md} {
        width: ${({ $md }) => $md && getWidthString($md)};
    }
    @media ${device.lg} {
        width: ${({ $lg }) => $lg && getWidthString($lg)};
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 999;
`;
