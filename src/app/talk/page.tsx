import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar";
import Favorites from "@/components/Favorites";
import ChatList from "@/components/ChatList";

export default function Home() {

    return (
        <div className="modii modii-dark">
            <StatusBar/>
            <Header/>
            <Favorites/>
            <div className="modii-talk-body">
                <div className="modii-content flex items-center justify-between">
                    <p className="custom-title">모디톡</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <Link href="/" className="flex items-center space-x-2 custom-button">
                            <h3 className="custom-last-p-tag mr-0.5">최신순</h3>
                            <Image
                                src="/images/dot.png"
                                alt="dot icon"
                                style={{objectFit: 'cover'}}
                                width={4}
                                height={16}
                            />
                        </Link>
                    </div>
                </div>
                <ChatList/>
            </div>
            <Footer/>
        </div>
    );
}
