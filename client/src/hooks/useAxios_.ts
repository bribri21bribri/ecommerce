import { useState, useCallback, useEffect } from 'react';
import { Method, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '../api/api';
import getError from '../utils/getError';

interface AxiosConfig extends AxiosRequestConfig {
    url: string;
    method: Method;
}

const useAxios = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [controller, setController] = useState<AbortController>();

    const sendRequest = useCallback(
        async (requestConfig: AxiosConfig, applyData: (res: any) => any) => {
            setIsLoading(true);
            setError(null);

            const ctrl = new AbortController();
            setController(ctrl);

            let res;
            try {
                res = await axiosInstance.request({
                    ...requestConfig,
                    signal: ctrl.signal,
                });
            } catch (err) {
                const errorCode = err.response && err.response.status;
                const message = getError(err);

                setError(message);
            } finally {
                if (res) {
                    applyData(res.data);
                }
                setIsLoading(false);
            }
        },
        []
    );

    const resetError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return {
        isLoading,
        error,
        sendRequest,
        resetError,
    };
};

export default useAxios;
