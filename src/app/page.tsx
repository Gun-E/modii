"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [homeImage, setHomeImage] = useState('/images/home=Icon_80px_home_on.png');
    const [isHomeClicked, setIsHomeClicked] = useState(false);
    const handleHomeMouseDown = () => {
        setHomeImage('/images/home=Icon_80px_home_off.png');
        setIsHomeClicked(true);
    };
    const handleHomeMouseUp = () => {
        setHomeImage('/images/home=Icon_80px_home_on.png');
        setIsHomeClicked(false);
    };
    return (
        <div className="relative" style={{width: '100%', height: '100%', backgroundColor: '#F7F7FF'}}>
            <div className="p-8 flex items-center justify-between">
                <Image
                    src="/images/logo_main.png"
                    alt="logo"
                    layout="contain"
                    objectFit="cover"
                    width={93}
                    height={24}
                />
                <Link href="/">
                    <Image
                        src="/images/icon_24px_set.png"
                        alt="logo"
                        layout="contain"
                        objectFit="cover"
                        width={24}
                        height={24}
                    />
                </Link>
            </div>
            <div className="flex justify-center">
                <Image
                    src="/images/room.png"
                    alt="logo"
                    layout="contain"
                    objectFit="cover"
                    width={373.93}
                    height={300}
                />
            </div>
            <div className="bg-white rounded-t-2xl"
                 style={{width: '100%', height: '52%', backgroundColor: 'white'}}>
                <div className="p-9 flex items-center justify-between">
                    <p className="custom-title">우리집 모디</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <Link href="/" className="flex items-center space-x-2 custom-button">
                            <h3 className="custom-p-tag">등록하기</h3>
                            <Image
                                src="/images/icon_20px_QR.png"
                                alt="QR icon"
                                layout="intrinsic"
                                objectFit="cover"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>
                </div>

                <div className="absolute flex items-center justify-between bottom-0 w-full p-11">
                    <div className="flex flex-col items-center justify-center mt-5">
                        <Link href="/" className="flex flex-col items-center space-y-1 custom-button">
                            <Image
                                src="/images/icon_30px_chat.png"
                                alt="chat icon"
                                layout="intrinsic"
                                objectFit="cover"
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
                            layout="intrinsic"
                            objectFit="cover"
                            width={80}
                            height={80}
                        />
                    </Link>

                    <div className="flex flex-col items-center justify-center mt-5">
                        <Link href="/" className="flex flex-col items-center space-y-1 custom-button">
                            <Image
                                src="/images/icon_30px_my.png"
                                alt="profile icon"
                                layout="intrinsic"
                                objectFit="cover"
                                width={30}
                                height={30}
                            />
                            <p className="custom-p-tag mt-1.5">프로필</p>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
