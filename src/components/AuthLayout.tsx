"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider, ProtectedRoute } from "@/app/context/AuthContext";

const noAuthRequired = ['/login', '/signup']; // 인증 필요 없는 페이지 경로

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname(); // 현재 경로를 가져옴

    return (
        <AuthProvider>
            {/* 인증이 필요 없는 페이지는 ProtectedRoute로 감싸지 않음 */}
            {noAuthRequired.includes(pathname) ? (
                <div className="iphone-container">
                    {children}
                </div>
            ) : (
                <ProtectedRoute>
                    <div className="iphone-container">
                        {children}
                    </div>
                </ProtectedRoute>
            )}
        </AuthProvider>
    );
};

export default AuthLayout;
