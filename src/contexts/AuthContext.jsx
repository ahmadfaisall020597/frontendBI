import { createContext, useEffect, useState } from 'react';
import { getAuth } from '../utils/authStorage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        if (auth?.user) {
            setUser(auth.user);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
