import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const email = sessionStorage.getItem('email');
        if (token && email) {
            setAuthenticated(true);
            setEmail(email);
        }
    }, []);

    const refresh = () => {
        const token = sessionStorage.getItem('token');
        const email = sessionStorage.getItem('email');
        setAuthenticated(!!token && !!email);
        setEmail(email || '');
        };
        
    const login = (token: string, email: string) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
        setAuthenticated(true);
        setEmail(email);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        setAuthenticated(false);
        setEmail('');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
