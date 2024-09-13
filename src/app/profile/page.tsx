import Image from 'next/image';
import React from 'react';
import Footer from "@/components/Footer";
import HeaderWhite from "@/components/HeaderWhite";
import StatusBar from "@/components/StatusBarWhite";

export default function Home() {

    return (
        <div className="modii modii-white">
            <StatusBar/>
            <div className="modii-profile-body">
                <HeaderWhite/>
                <Image
                    src="/images/사용자 성격.png"
                    alt="성격"
                    style={{
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 178,
                        left: 31
                    }}
                    width={333}
                    height={78}
                />
            </div>
            <Image
                src="/images/내 일정.png"
                alt="일정"
                style={{
                    objectFit: 'cover',
                    position: 'absolute',
                    bottom: 268,
                    left: 31
                }}
                width={333}
                height={78}
            />
            <Footer/>
        </div>
    );
}
