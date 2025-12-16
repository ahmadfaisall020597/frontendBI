import apiClient from './apiClient';
import { API_CONFIG } from '../config/apiConfig';

const dashboardApi = apiClient(API_CONFIG.AUTH_SERVICE);

export const Dashboard = async () => {
    const response = await dashboardApi.get(
        '/dashboard'
    );
    return response.data;
};