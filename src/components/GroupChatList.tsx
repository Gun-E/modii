// GroupChatList.tsx
"use client";
import React, { useEffect, useState } from 'react';
import GroupChat from './GroupChat';

interface ChatData {
    id: number;
    robotVacuumImage: string;
    refrigeratorImage: string;
    robotVacuumBgColor: string;
    refrigeratorBgColor: string;
    name: string;
    message: string;
    messageDate: string;
}

const GroupChatList: React.FC = () => {
    const [chats, setChats] = useState<ChatData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // API에서 데이터 받아오기
        fetch('https://your-api-endpoint.com/chats')
            .then((response) => response.json())
            .then((data: ChatData[]) => {
                setChats(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching chat data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="loading-overlay">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <GroupChat
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    robotVacuumImage={chat.robotVacuumImage}
                    refrigeratorImage={chat.refrigeratorImage}
                    robotVacuumBgColor={chat.robotVacuumBgColor}
                    refrigeratorBgColor={chat.refrigeratorBgColor}
                    name={chat.name}
                    message={chat.message}
                    messageDate={chat.messageDate}
                />
            ))}
        </div>
    );
};

export default GroupChatList;
