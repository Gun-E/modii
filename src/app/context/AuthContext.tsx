"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다.');
    }
    return context;
};

// 로그인 안 되어 있으면 보호된 페이지에 접근하지 못하게 하는 컴포넌트
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login'); // 로그인이 안 된 경우 로그인 페이지로 리다이렉트
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return null; // 로그인 여부를 확인하는 동안 빈 화면
    }

    return <>{children}</>; // 로그인된 경우에만 자식 컴포넌트를 렌더링
};
