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

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getUserRole = () => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user).role;
};
