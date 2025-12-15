import apiClient from './apiClient';
import { API_CONFIG } from '../config/apiConfig';

const webinarApi = apiClient(API_CONFIG.AUTH_SERVICE);

export const getWebinarList = async (search = '', page = 1) => {
    const res = await webinarApi.get(
        `/list-webinar?search=${search}&page=${page}`
    );
    return res.data;
};

export const createWebinar = async (payload) => {
    const res = await webinarApi.post('/create-webinar', payload);
    return res.data;
};

export const getWebinarDetail = async (id) => {
    const res = await webinarApi.get(`/detail-webinar/${id}`);
    return res.data;
};

export const updateWebinar = async (id, payload) => {
    const res = await webinarApi.post(`/edit-webinar/${id}`, payload);
    return res.data;
};

export const deleteWebinar = async (id) => {
    const res = await webinarApi.delete(`/delete-webinar/${id}`);
    return res.data;
};
