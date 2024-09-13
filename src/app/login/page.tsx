"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://192.168.219.107:8080/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token } = response.data;
            login(token);
            router.push('/');
        } catch (err) {
            setError('로그인 실패: 이메일 또는 비밀번호를 확인해주세요.');
        }
    };

    return (
        <div className="modii modii-white ">
            <div className="flex justify-center">
                <Image
                    src="/images/login_logo.png"
                    alt="login_logo"
                    style={{
                        objectFit: 'cover',
                        position: 'absolute',
                        top:134
                    }}
                    width={189}
                    height={90}
                />
                <form onSubmit={handleSubmit} className="absolute" style={{
                    bottom:150
                }}>
                    <div className="flex flex-col mb-56 space-y-1">
                        <label htmlFor="email" className="text-gray-300">이메일</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-b border-black focus:outline-none p-2"
                            placeholder="이메일을 입력하세요"
                        />
                        <label htmlFor="password" className="text-gray-300">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-b border-black focus:outline-none p-2"
                            placeholder="비밀번호를 입력하세요"
                        />
                        {error && <p className="absolute top-40 text-red-500 w-64">{error}</p>}
                    </div>

                    <button
                        type="submit"
                    >
                        <Image
                            src="/images/btn_250_50_off.png"
                            alt="btn_off"
                            style={{
                                objectFit: 'cover'
                            }}
                            width={250}
                            height={50}
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}
