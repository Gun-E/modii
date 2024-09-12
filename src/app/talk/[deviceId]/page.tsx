"use client";

import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import StatusBarWhite from "@/components/StatusBarWhite";
import Link from "next/link";

// 채팅 메시지 타입
type ChatMessage = {
    senderType: string;
    chattedList: string;
    chattedTime: Date;
    deviceType: string;
    image: string;
};

export default function Home() {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState<string>(""); // 입력한 메시지 상태
    const userId = 1; // 유저 ID
    const deviceId = 1; // 디바이스 ID

    // 채팅 가져오기
    useEffect(() => {
        fetchChatMessages();
    }, []);

    const fetchChatMessages = async () => {
        try {
            const response = await fetch(`http://192.168.219.107:8080/device/${userId}/chat/${deviceId}`);
            const data = await response.json();
            setChatMessages(data);
        } catch (error) {
            console.error("Error fetching chat messages:", error);
        }
    };
    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        const today = new Date();

        const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();

        if (isToday) {
            const timeString = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            const [time, period] = timeString.split(' ');
            return `${period} ${time}`;
        } else {
            const year = date.getFullYear().toString().slice(-2); // YY
            const month = String(date.getMonth() + 1).padStart(2, '0'); // MM
            const day = String(date.getDate()).padStart(2, '0'); // DD
            return `${year}.${month}.${day}`; // "24.09.10"
        }
    };
    // 채팅 보내기
    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const response = await fetch(`http://192.168.219.107:8080/device/${userId}/chat/${deviceId}/input`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message}), // 전송할 메시지
            });

            if (!response.ok) throw new Error('Failed to send message');
            setMessage(""); // 메시지 전송 후 입력창 초기화
            fetchChatMessages(); // 채팅 목록 갱신
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="modii-chat-detail">
            <StatusBarWhite/>
            <div className="modii-chat-detail-header flex justify-center">
                <Link href="/talk">
                    <Image
                        src="/images/icon_24px_arrow_back_white.png"
                        alt="arrow"
                        style={{
                            objectFit: 'cover',
                            position: 'absolute',
                            left: 20,
                            top: 81
                        }}
                        width={24}
                        height={24}
                    />
                </Link>
                곽춘배
            </div>
            
            {chatMessages.map((chat, index) => (
                <div key={index} className={`modii-chat-detail-body`}>
                    {chat.senderType === "device" && (
                        <div className="chat-detail-content">
                            <div className="chat-circle-chat" style={{backgroundColor: chat.image}}>
                                <Image
                                    src={`/images/${chat.deviceType}.png`}
                                    alt={chat.deviceType}
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
                                    <span
                                        className="chat-time">{formatDate(chat.chattedTime)}</span> {/* 포맷팅된 시간 */}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            ))}

            <div className="modii-chat-detail-footer">
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="모디에게 말을 건내보세요!"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
