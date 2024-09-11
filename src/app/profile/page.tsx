import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {

    return (
        <div className="modii modii-dark">
            <Header />

            <div className="modii-talk-body">
                <div className="p-9 flex items-center justify-between">
                    <p className="custom-title">모디톡</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <Link href="/" className="flex items-center space-x-2 custom-button">
                            <h3 className="custom-p-tag">최신순</h3>
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
            </div>
            <Footer />
        </div>
    );
}
