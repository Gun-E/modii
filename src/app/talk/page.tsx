import Image from 'next/image';
import React from "react";

export default function Home() {
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
                <Image
                    src="/images/icon_24px_set.png"
                    alt="logo"
                    layout="contain"
                    objectFit="cover"
                    width={24}
                    height={24}
                />
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
                        <h3 className="custom-p-tag">등록하기</h3>
                        <Image
                            src="/images/icon_20px_QR.png"
                            alt="logo"
                            layout="intrinsic"
                            objectFit="cover"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>

                <div className="absolute flex items-center justify-between bottom-0 w-full p-11">
                    <div className="flex flex-col items-center justify-center mt-5">
                        <Image
                            src="/images/icon_30px_chat.png"
                            alt="logo"
                            layout="intrinsic"
                            objectFit="cover"
                            width={30}
                            height={30}
                        />
                        <p className="custom-p-tag mt-1.5">모디톡</p>
                    </div>

                    <Image
                        src="/images/home=Icon_80px_home_on.png"
                        alt="home icon"
                        layout="intrinsic"
                        objectFit="cover"
                        width={80}
                        height={80}
                    />

                    <div className="flex flex-col items-center justify-center mt-5">
                        <Image
                            src="/images/icon_30px_my.png"
                            alt="profile icon"
                            layout="intrinsic"
                            objectFit="cover"
                            width={30}
                            height={30}
                        />
                        <p className="custom-p-tag mt-1.5">프로필</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
