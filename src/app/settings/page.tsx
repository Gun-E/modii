import Image from 'next/image';
import React from 'react';
import Link from "next/link";
import StatusBar from "@/components/StatusBar";


export default function Home() {

    return (
        <div className="modii-create">
            <StatusBar/>
            <div className="modii-create-header flex justify-center">
                <Link href="/">
                    <Image
                        src="/images/icon_24px_arrow_back.png"
                        alt="arrow"
                        style={{
                            objectFit: 'cover',
                            position: 'absolute',
                            left: 20,
                            top: 81
                        }}
                        width={24}
                        height={24}
                    />
                </Link>
                <h1 className="custom-title">모디설정</h1>
            </div>
            <div className="flex justify-center">
                <Image
                    src="/images/settings.png"
                    alt="settings"
                    style={{
                        objectFit: 'cover'
                    }}
                    width={333}
                    height={484}
                />
            </div>

        </div>
    );
}
