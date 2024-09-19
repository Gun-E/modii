"use client";

import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import {ChatListDTO} from "@/types/ChatListDTO";
import { formatDate } from '@/utils/utils';

export default function ChatList() {
    const [chatList, setChatList] = useState<ChatListDTO[]>([]);

    useEffect(() => {
        fetch('https://aqueous-coast-82122-c626a44767e1.herokuapp.com/device/1/chat-list')
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
            <Link href={`/`} className="chat-body">
                <div className="chat-content">
                    <div className="double-circle">
                        <div className="circle-chat absolute top-0 start-0">
                            <Image
                                src={`/images/robotvacuum.png`}
                                alt={`refrigerator`}
                                style={{
                                    objectFit: 'cover',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f8afc6'
                                }}
                                width={42}
                                height={42}
                            />

                        </div>
                        <div className="circle-chat absolute bottom-0 end-0">
                            <Image
                                src={`/images/refrigerator.png`}
                                alt={`refrigerator`}
                                style={{
                                    objectFit: 'cover',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#D6FCD8'
                                }}
                                width={42}
                                height={42}
                            />
                        </div>
                    </div>

                    <div className="chat-text">
                        <h2 className="modii-name">울집 애기들</h2>
                        <div className="message-time">
                            <span className="message">어제 왜 작은방 청소 안했는데 잤어?</span>
                            <span className="time">{formatDate("2024-09-19 09:00:00.000000")}</span>
                        </div>
                    </div>
                </div>
            </Link>
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
                                <span className="time">{formatDate(data.chattedTime)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
