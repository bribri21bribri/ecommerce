interface Size {
    sm: string;
    md: string;
    lg: string;
}

const size: Size = {
    sm: '576px',
    md: '768px',
    lg: '1200px',
};

const device = {
    sm: `(min-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`,
};

export default device;
