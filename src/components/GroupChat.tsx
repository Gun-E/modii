"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { formatDate } from "@/utils/utils";

interface GroupChatData {
    groupId: number;
    deviceCount: number;
    lastMessage: string;
    lastMessageDate: Date;
    groupName: string;
}

const CACHE_KEY = 'groupChats';
const CACHE_DURATION = 5 * 60 * 1000; // 5분

const GroupChat = () => {
    const [groupChats, setGroupChats] = useState<GroupChatData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGroupChats = async () => {
            // 캐시에서 데이터 가져오기
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cacheTime = localStorage.getItem(`${CACHE_KEY}_time`);

            if (cachedData && cacheTime) {
                const now = new Date().getTime();
                const cacheAge = now - parseInt(cacheTime, 10);

                if (cacheAge < CACHE_DURATION) {
                    // 캐시가 유효한 경우
                    setGroupChats(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
            }

            // 캐시가 없거나 만료된 경우, API 호출
            try {
                const response = await fetch('https://aqueous-coast-82122-c626a44767e1.herokuapp.com/group/1/chat-list');
                if (response.ok) {
                    const data: GroupChatData[] = await response.json();
                    setGroupChats(data);
                    // 데이터와 캐시 저장 시간 저장
                    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                    localStorage.setItem(`${CACHE_KEY}_time`, new Date().getTime().toString());
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupChats();
    }, []);

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div>
            {groupChats.map(groupChat => (
                <Link key={groupChat.groupId} href={`/group/1`} className="chat-body">
                    <div className="chat-content">
                        <div className="double-circle">
                            <div className="circle-chat absolute top-0 start-0">
                                <Image
                                    src={`/images/robotvacuum.png`}
                                    alt={`robot vacuum`}
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
                            <h2 className="modii-name">
                                {groupChat.groupName}
                                <span className="device-count">{groupChat.deviceCount}</span>
                            </h2>

                            <div className="message-time">
                                <span className="message">{groupChat.lastMessage}</span>
                                <span className="time">{formatDate(groupChat.lastMessageDate)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GroupChat;
