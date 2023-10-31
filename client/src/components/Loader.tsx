import { styled } from 'styled-components';
import ReactPortal from './ReactPortal';
import { Overlay } from '../styles/global';

const Spinner = styled.div`
    z-index: 1000;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    opacity: 0.85;
    text-align: left;
    border: 6px solid rgba(0, 108, 16, 0.5);
    box-sizing: border-box;
    background-clip: padding-box;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    &:after,
    &:before {
        content: '';
        position: absolute;
        margin: -6px;
        box-sizing: inherit;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        opacity: 1;
        border: inherit;
        border-color: transparent;
        border-top-color: rgba(0, 108, 16, 0.7);
        -webkit-animation:
            video-react-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8)
                infinite,
            video-react-spinner-fade 1.1s linear infinite;
        animation:
            video-react-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8)
                infinite,
            video-react-spinner-fade 1.1s linear infinite;
    }

    &:before,
    &:before {
        border-top-color: ${({ theme }) => theme.colors.primary};
    }

    &:after,
    &:after {
        border-top-color: ${({ theme }) => theme.colors.primary};
        -webkit-animation-delay: 0.44s;
        animation-delay: 0.44s;
    }

    @keyframes video-react-spinner-spin {
        to {
            transform: rotate(1turn);
        }
    }

    @-webkit-keyframes video-react-spinner-spin {
        to {
            -webkit-transform: rotate(1turn);
        }
    }

    @keyframes video-react-spinner-fade {
        0% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        20% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        35% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        60% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        to {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }
    }

    @-webkit-keyframes video-react-spinner-fade {
        0% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        20% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        35% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        60% {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }

        to {
            border-top-color: ${({ theme }) => theme.colors.primary};
        }
    }
`;

const Loader = () => {
    return (
        <ReactPortal wrapperId="portal-loader-container">
            <Overlay />
            <Spinner />
        </ReactPortal>
    );
};

export default Loader;
