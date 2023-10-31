import { useState, useCallback, useEffect } from 'react';
import { Method, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '../api/api';
import { useAppDispatch } from '../app/hooks';
import { setModal, ModalType } from '../features/common/commonSlice';
import getError from '../utils/getError';

interface AxiosConfig extends AxiosRequestConfig {
    url: string;
    method: Method;
}

const useAxios = () => {
    const [controller, setController] = useState<AbortController>();
    const dispatch = useAppDispatch();
    const sendRequest = useCallback(async (requestConfig: AxiosConfig) => {
        const ctrl = new AbortController();
        setController(ctrl);

        return axiosInstance.request({
            ...requestConfig,
            signal: ctrl.signal,
        });
    }, []);

    useEffect(() => {
        const resInterceptor = (response: AxiosResponse) => {
            return response;
        };

        const errInterceptor = (error: AxiosError<{ message: string }>) => {
            const status = error.response?.status || 500;
            // handle global errors here

            dispatch(
                setModal({
                    title: `Error ${status}`,
                    message: getError(error),
                    errorCode: status,
                    type: ModalType.error,
                })
            );
            return Promise.reject(error);
        };

        const interceptor = axiosInstance.interceptors.response.use(
            resInterceptor,
            errInterceptor
        );

        return () => axiosInstance.interceptors.response.eject(interceptor);
    }, [dispatch]);

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return {
        sendRequest,
    };
};

export default useAxios;
