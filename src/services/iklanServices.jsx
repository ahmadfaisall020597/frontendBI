import apiClient from './apiClient';
import { API_CONFIG } from '../config/apiConfig';

const iklanApi = apiClient(API_CONFIG.AUTH_SERVICE);

export const getIklanList = async (search = '', page = 1) => {
    const response = await iklanApi.get(
        `/list-iklan?search=${search}&page=${page}`
    );
    return response.data;
};

export const createIklan = async (payload) => {
    const response = await iklanApi.post('/create-iklan', payload);
    return response.data;
};

export const deleteIklan = async (id) => {
    const response = await iklanApi.delete(`/delete-iklan/${id}`);
    return response.data;
};

export const updateIklan = async (id, payload) => {
    const response = await iklanApi.post(`/edit-iklan/${id}`, payload);
    return response.data;
};

export const getIklanDetail = async (id) => {
    const response = await iklanApi.get(`/detail-iklan/${id}`);
    return response.data;
};