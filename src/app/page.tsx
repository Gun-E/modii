import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Room from "@/components/Room";
import DeviceSwitchs from "@/components/DeviceSwitchs";
import {DeviceProvider} from '@/context/DeviceContext';
import StatusBar from "@/components/StatusBar";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {

    return (
        <DeviceProvider>
            <div className="modii">
                <StatusBar/>
                <Header/>
                <Room/>
                <div className="modii-body">
                    <div className="modii-content flex items-center justify-between">
                        <p className="custom-title">우리집 모디</p>
                        <div className="flex items-center space-x-2 mt-1">
                            <Link href="/create" className="flex items-center space-x-2 custom-button">
                                <h3 className="custom-p-tag">등록하기</h3>
                                <Image
                                    src="/images/icon_20px_QR.png"
                                    alt="QR icon"
                                    style={{objectFit: 'cover'}}
                                    width={20}
                                    height={20}
                                />
                            </Link>
                        </div>
                    </div>
                    <DeviceSwitchs/>
                    <ProgressBar/>
                </div>
                <Footer/>
            </div>
        </DeviceProvider>
    );
}
