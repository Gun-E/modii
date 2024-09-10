import Image from 'next/image';
import React from "react";

export default function Home() {
    return (
        <div className="bg-stone-50 relative" style={{width: '100%', height: '100%', backgroundColor: '#F7F7FF'}}>
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
            <div className="absolute bottom-0 bg-white rounded-t-2xl"
                 style={{width: '100%', height: '50%', backgroundColor: 'white'}}>
            </div>
        </div>
    );
}
