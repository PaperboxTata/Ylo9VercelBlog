import axios, { type AxiosRequestConfig } from 'axios'

const DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
}

const instance = axios.create(DEFAULT_CONFIG)

instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (error.response) {
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data
            })
        } else {
            console.error('Request Error:', error.message)
        }
        return Promise.reject(error)
    }
)

export const http = {
    /**
     * GET请求
     * @param url
     * @param params
     * @param config
     */
    async get<In = any, Out = any>(
        url: string,
        params?: In,
        config?: AxiosRequestConfig
    ): Promise<Out> {
        return instance.get(url, { ...config, params })
    },

    /**
     * POST请求
     * @param url
     * @param data
     * @param config
     */
    async post<In = any, Out = any>(
        url: string,
        data?: In,
        config?: AxiosRequestConfig
    ): Promise<Out> {
        return instance.post(url, data, config)
    }
}