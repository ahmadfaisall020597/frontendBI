import apiClient from './apiClient';
import { API_CONFIG } from '../config/apiConfig';

const api = apiClient(API_CONFIG.AUTH_SERVICE);

export const createPendaftaran = async (payload) => {
    const response = await api.post('/pendaftaran', payload);
    return response.data;
};

export const getPendaftaranSaya = async () => {
    const res = await api.get('/pendaftaran-saya');
    return res.data;
};