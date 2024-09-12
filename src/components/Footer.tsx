// components/Footer.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const [homeImage, setHomeImage] = useState('/images/home=Icon_80px_home_on.png');
    const [chatImage, setChatImage] = useState('/images/chat_icon_off.png');
    const [profileImage, setProfileImage] = useState('/images/my_icon_off.png');

    useEffect(() => {
        setHomeImage(pathname === '/' ? '/images/home=Icon_80px_home_on.png' : '/images/home=Icon_80px_home_off.png');

        setChatImage(pathname === '/talk' ? '/images/chat_icon_on.png' : '/images/chat_icon_off.png');

        setProfileImage(pathname === '/profile' ? '/images/my_icon_on.png' : '/images/my_icon_off.png');
    }, [pathname]);

    return (
        <div className="absolute flex items-center justify-between bottom-0 w-full custom-footer-padding">
            <div className="flex flex-col items-center justify-center mt-5">
                <Link href="/talk" className="flex flex-col items-center space-y-1">
                    <Image
                        src={chatImage}
                        alt="chat icon"
                        style={{ objectFit: 'cover' }}
                        width={37}
                        height={54}
                    />
                </Link>
            </div>

            <Link
                href="/"
                className="flex items-center justify-center"
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
                <Link href="/profile" className="flex flex-col items-center space-y-1">
                    <Image
                        src={profileImage}
                        alt="profile icon"
                        style={{ objectFit: 'cover' }}
                        width={37}
                        height={54}
                    />
                </Link>
            </div>
        </div>
    );
}
