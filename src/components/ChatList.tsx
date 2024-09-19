"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ChatListDTO } from "@/types/ChatListDTO";
import { formatDate } from '@/utils/utils';
import GroupChat from "@/components/GroupChat";

const CACHE_KEY = 'chatListCache';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function ChatList() {
    const [chatList, setChatList] = useState<ChatListDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const now = Date.now();
            const cachedData = localStorage.getItem(CACHE_KEY);

            if (cachedData) {
                const { timestamp, data } = JSON.parse(cachedData);
                if (now - timestamp < CACHE_EXPIRY_TIME) {
                    setChatList(data);
                    setIsLoading(false);
                    return;
                }
            }

            try {
                const response = await fetch('https://aqueous-coast-82122-c626a44767e1.herokuapp.com/device/1/chat-list');
                const data: ChatListDTO[] = await response.json();
                localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data }));
                setChatList(data);
            } catch (error) {
                console.error('Error fetching API data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="loading-overlay"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="chat-list">
                    <GroupChat/>

            {chatList.map((data) => (
                <Link href={`/talk/${data.deviceId}`} key={data.deviceId} className="chat-body">
                    <div className="chat-content">
                        <div className="circle-chat" style={{ backgroundColor: data.image }}>
                            <Image
                                src={`/images/${data.deviceType}.png`}
                                alt={data.name}
                                style={{
                                    objectFit: 'cover',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="chat-text">
                            <h2 className="modii-name">{data.name}</h2>
                            <div className="message-time">
                                <span className="message">{data.chattedList}</span>
                                <span className="time">{formatDate(data.chattedTime)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
