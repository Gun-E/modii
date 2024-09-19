"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import {formatDate} from "@/utils/utils";


const GroupChat = () => {
    return (
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
                    <h2 className="modii-name">
                        울집 애기들
                        <span className="device-count">4</span>
                    </h2>

                    <div className="message-time">
                        <span className="message">어제 왜 작은방 청소 안했는데 잤어?</span>
                        <span className="time">{formatDate("2024-09-19 09:00:00.000000")}</span>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default GroupChat;
