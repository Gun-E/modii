"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';


const GroupChat = () => {
    return (
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
    );
};

export default GroupChat;
