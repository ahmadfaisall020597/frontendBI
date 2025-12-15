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
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getUserRole = () => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user).role;
};
