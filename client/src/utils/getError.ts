import { AxiosError } from 'axios';

const getError = (err: AxiosError<{ message: string }>) => {
    return (
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
    );
};

export default getError;
