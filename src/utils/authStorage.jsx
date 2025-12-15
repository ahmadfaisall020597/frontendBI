export const setAuth = ({ token, user }) => {
    localStorage.setItem(
        'auth',
        JSON.stringify({ token, user })
    );
};

export const getAuth = () => {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
};

export const clearAuth = () => {
    localStorage.removeItem('auth');
};

export const getToken = () => {
    const auth = getAuth();
    return auth?.token || null;
};

export const isAuthenticated = () => {
    return !!getToken();
};;

export const getUser = () => {
    try {
        const auth = localStorage.getItem('auth');
        if (!auth) return null;

        const parsed = JSON.parse(auth);
        return parsed?.user || null;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
};

export const getUserRole = () => {
    const auth = getAuth();
    return auth?.user?.role || null;
};
