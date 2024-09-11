"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
    const [homeImage, setHomeImage] = useState('/images/home=Icon_80px_home_on.png');

    const handleHomeMouseDown = () => {
        setHomeImage('/images/home=Icon_80px_home_off.png');
    };

    const handleHomeMouseUp = () => {
        setHomeImage('/images/home=Icon_80px_home_on.png');
    };

    return (
        <div className="absolute flex items-center justify-between bottom-0 w-full p-11">
            <div className="flex flex-col items-center justify-center mt-5">
                <Link href="/talk" className="flex flex-col items-center space-y-1 custom-button">
                    <Image
                        src="/images/icon_30px_chat.png"
                        alt="chat icon"
                        style={{ objectFit: 'cover' }}
                        width={30}
                        height={30}
                    />
                    <p className="custom-p-tag mt-1.5">모디톡</p>
                </Link>
            </div>

            <Link
                href="/"
                className="flex items-center justify-center"
                onMouseDown={handleHomeMouseDown}
                onMouseUp={handleHomeMouseUp}
            >
                <Image
                    src={homeImage}
                    alt="home icon"
                    style={{ objectFit: 'cover' }}
                    width={80}
                    height={80}
                />
            </Link>

            <div className="flex flex-col items-center justify-center mt-5">
                <Link href="/profile" className="flex flex-col items-center space-y-1 custom-button">
                    <Image
                        src="/images/icon_30px_my.png"
                        alt="profile icon"
                        style={{ objectFit: 'cover' }}
                        width={30}
                        height={30}
                    />
                    <p className="custom-p-tag mt-1.5">프로필</p>
                </Link>
            </div>
        </div>
    );
}
