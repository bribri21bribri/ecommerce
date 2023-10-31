import { ReactNode } from 'react';
import { styled } from 'styled-components';
import ReactPortal from './ReactPortal';
import { Overlay } from '../styles/global';

const ModalWrap = styled.div<{ $witdh?: string }>`
    width: ${(props) => props.$witdh || '52%'};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.colors.third};
    padding: 50px;
    z-index: 1000;
    border-radius: 5px;
    box-shadow: 5px 5px 10px;
`;
const ModalContent = styled.div`
    position: relative;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-clip: padding-box;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
`;

const ModalBody = styled.div`
    padding: 1rem;
`;
const ModalHeaderWrap = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dedede;
    & > .react-modal-title {
        color: ${({ theme }) => theme.colors.primary};
        line-height: 1.5;
        font-size: 1.25rem;
    }
    & > .btn-close {
        border: none;
        font-size: 1rem;
        padding: 0.25rem;
        cursor: pointer;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text};
        background: transparent;
    }
`;

const ModalFooter = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #dedede;
`;

interface Props {
    children?: ReactNode;
}

const ModalRoot: React.FC<Props> = ({ children }) => {
    return (
        <ReactPortal wrapperId="portal-modal-container">
            <Overlay />
            <ModalWrap>
                <ModalContent>{children}</ModalContent>
            </ModalWrap>
        </ReactPortal>
    );
};

interface ModalHeaderProps {
    children?: ReactNode;
    handleClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, handleClose }) => {
    return (
        <ModalHeaderWrap>
            <div className="react-modal-title">{children}</div>
            <button
                type="button"
                onClick={handleClose}
                className="button btn-close"
            >
                &times;
            </button>
        </ModalHeaderWrap>
    );
};

const Modal = {
    Root: ModalRoot,
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
};

export default Modal;
