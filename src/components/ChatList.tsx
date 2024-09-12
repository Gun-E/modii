"use client";

import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import {ChatListDTO} from "@/types/ChatListDTO";

export default function ChatList() {
    const [chatList, setChatList] = useState<ChatListDTO[]>([]);

    useEffect(() => {
        fetch('http://192.168.219.107:8080/device/1/chat-list')
            .then((response) => response.json())
            .then((data: ChatListDTO[]) => {
                setChatList(data);
            })
            .catch((error) => {
                console.error('Error fetching API data:', error);
            });
    }, []);

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



    return (
        <div className="chat-list">
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
                                <span className="time">{formatDate(data.chattedTime)}</span> {/* 포맷팅된 시간 */}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
