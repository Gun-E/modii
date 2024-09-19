"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { formatDate } from '@/utils/utils';

interface GroupChatProps {
    href: string;
    robotVacuumImage: string;
    refrigeratorImage: string;
    robotVacuumBgColor: string;
    refrigeratorBgColor: string;
    name: string;
    message: string;
    messageDate: string;
}

const GroupChat: React.FC<GroupChatProps> = ({
                                               href,
                                               robotVacuumImage,
                                               refrigeratorImage,
                                               robotVacuumBgColor,
                                               refrigeratorBgColor,
                                               name,
                                               message,
                                               messageDate
                                           }) => {
    return (
        <Link href={href} className="chat-body">
            <div className="chat-content">
                <div className="double-circle">
                    <div className="circle-chat absolute top-0 start-0">
                        <Image
                            src={robotVacuumImage}
                            alt="robot vacuum"
                            style={{
                                objectFit: 'cover',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: robotVacuumBgColor
                            }}
                            width={42}
                            height={42}
                        />
                    </div>
                    <div className="circle-chat absolute bottom-0 end-0">
                        <Image
                            src={refrigeratorImage}
                            alt="refrigerator"
                            style={{
                                objectFit: 'cover',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: refrigeratorBgColor
                            }}
                            width={42}
                            height={42}
                        />
                    </div>
                </div>

                <div className="chat-text">
                    <h2 className="modii-name">{name}</h2>
                    <div className="message-time">
                        <span className="message">{message}</span>
                        <span className="time">{formatDate(messageDate)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GroupChat;
