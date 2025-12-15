import apiClient from './apiClient';
import { API_CONFIG } from '../config/apiConfig';

const kalanganApi = apiClient(API_CONFIG.AUTH_SERVICE);

export const getKalanganList = async (search = '', page = 1) => {
    const res = await kalanganApi.get(
        `/list-kalangan?search=${search}&page=${page}`
    );
    return res.data;
};

export const createKalangan = async (payload) => {
    const res = await kalanganApi.post('/create-kalangan', payload);
    return res.data;
};

export const getKalanganDetail = async (id) => {
    const res = await kalanganApi.get(`/detail-kalangan/${id}`);
    return res.data;
};

export const updateKalangan = async (id, payload) => {
    const res = await kalanganApi.post(`/edit-kalangan/${id}`, payload);
    return res.data;
};

export const deleteKalangan = async (id) => {
    const res = await kalanganApi.delete(`/delete-kalangan/${id}`);
    return res.data;
};
