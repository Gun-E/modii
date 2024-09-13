"use client";

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import StatusBarWhite from "@/components/StatusBarWhite";
import Link from "next/link";
import { formatDate } from '@/utils/utils';

type ChatMessage = {
    name: string;
    senderType: string;
    chattedList: string;
    chattedTime: Date;
    deviceType: string;
    image: string;
};

export default function Home() {
    const pathname = usePathname();
    const deviceId = pathname?.split("/")[2];
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userId = 1;

    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const shouldScrollRef = useRef<boolean>(false);

    const fetchChatMessages = useCallback(async () => {
        if (!deviceId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`http://192.168.219.107:8080/device/${userId}/chat/${deviceId}`);
            const data = await response.json();
            setChatMessages(data);
            shouldScrollRef.current = true;
        } catch (error) {
            console.error("Error fetching chat messages:", error);
        } finally {
            setIsLoading(false);
        }
    }, [deviceId]);

    useEffect(() => {
        fetchChatMessages();
    }, [fetchChatMessages]);

    useEffect(() => {
        if (!isLoading && shouldScrollRef.current && chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
            shouldScrollRef.current = false;
        }
    }, [isLoading, chatMessages]);

    const sendMessage = async () => {
        if (!message.trim() || !deviceId) return;

        try {
            const response = await fetch(`http://192.168.219.107:8080/chat/${userId}/${deviceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, deviceId }),
            });

            if (!response.ok) throw new Error('Failed to send message');
            setMessage("");
            shouldScrollRef.current = true;
            await fetchChatMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="modii-chat-detail">
            <StatusBarWhite />
            <div className="modii-chat-detail-header flex justify-center">
                <Link href="/talk">
                    <Image
                        src="/images/icon_24px_arrow_back_white.png"
                        alt="arrow"
                        style={{ objectFit: 'cover', position: 'absolute', left: 20, top: 81 }}
                        width={24}
                        height={24}
                    />
                </Link>
                <h1>{chatMessages.length > 0 ? chatMessages[0].name : 'Chat'}</h1>
            </div>

            <div className="modii-chat-detail-body" ref={chatBodyRef}>
                {isLoading ? (
                    <div className="flex justify-center items-center caret-blue-100">채팅방 로딩중</div>
                ) : (
                    chatMessages.map((chat, index) => (
                        <div key={index} className={`chat-message ${chat.senderType}`}>
                            {chat.senderType === "device" && (
                                <div className="chat-detail-content">
                                    <div className="chat-circle-chat" style={{ backgroundColor: chat.image }}>
                                        <Image
                                            src={`/images/${chat.deviceType}.png`}
                                            alt={chat.deviceType}
                                            style={{ objectFit: 'cover', justifyContent: 'center', alignItems: 'center' }}
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                    <div className="chat-text">
                                        <h2 className="modii-name">{chat.name}</h2>
                                        <div className="chat-detail-message-time">
                                            <span className="device-chat-message">{chat.chattedList}</span>
                                            <span className="chat-time">{formatDate(chat.chattedTime)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {chat.senderType === "user" && (
                                <div className="chat-user-detail-content">
                                    <div className="chat-text">
                                        <div className="chat-user-message-time">
                                            <span className="device-chat-message">{chat.chattedList}</span>
                                            <span className="chat-user-time">{formatDate(chat.chattedTime)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="modii-chat-detail-footer">
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="모디에게 말을 건내보세요!"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="input-send-button" onClick={sendMessage}>
                        <Image
                            src={`/images/icon_24px_send.png`}
                            alt="send"
                            width={23}
                            height={23}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}