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
                <h1 className="custom-title">등록하기</h1>
            </div>
            <Image
                src="/images/camera.png"
                alt="camera"
                style={{
                    objectFit: 'cover'
                }}
                width={390}
                height={726}
            />

            <div className="flex items-center justify-center">
                <Image
                    src="/images/info.png"
                    alt="info"
                    style={{
                        objectFit: 'cover',
                        position: 'absolute',
                        bottom: 160
                    }}
                    width={280}
                    height={34}
                />
            </div>
            <Link
                href="/"
                className="flex items-center justify-center">
                <Image
                    src="/images/icon_80px_QR.png"
                    alt="icon_80px_QR"
                    style={{
                        objectFit: 'cover',
                        position: 'absolute',
                        bottom: 60
                    }}
                    width={80}
                    height={80}
                />
            </Link>
        </div>
    );
}
