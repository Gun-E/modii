"use client";

import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import {ChatListDTO} from "@/types/ChatListDTO";
import { formatDate } from '@/utils/utils';

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


    return (
        <div className="chat-list">
            {chatList.map((data) => (
                <Link href={`/talk/${data.deviceId}`} key={data.deviceId} className="chat-body">
                    <div className="chat-content">
                        <div className="circle-chat" style={{backgroundColor: data.image}}>
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
