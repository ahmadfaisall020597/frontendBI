import apiClient from './apiClient';
import { API_CONFIG } from '../config/apiConfig';

const authApi = apiClient(API_CONFIG.AUTH_SERVICE);

export const login = async (payload) => {
    const response = await authApi.post('/login', payload);
    return response.data;
};

export const logout = async () => {
    return authApi.post('/logout');
};

export const register = async (payload) => {
    const response = await authApi.post('/register', payload);
    return response.data;
};
