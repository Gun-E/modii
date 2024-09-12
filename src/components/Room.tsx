// Room.tsx
"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useDevice} from '@/context/DeviceContext';

const overlayImageMap: { [key: string]: { on: string, off: string } } = {
    refrigerator: {
        on: "/images/refrigerator_on_overlay.png",
        off: "/images/refrigerator_off_overlay.png",
    },
    aircon: {
        on: "/images/air_conditioner_on_overlay.png",
        off: "/images/air_conditioner_off_overlay.png",
    },
    tv: {
        on: "/images/tv_on_overlay.png",
        off: "/images/tv_off_overlay.png",
    },
    robotvacuum: {
        on: "/images/robot_on_overlay.png",
        off: "/images/robot_off_overlay.png",
    },
};

export default function Room() {
    const {devices} = useDevice();
    const [overlayImages, setOverlayImages] = useState<string[]>([]);

    useEffect(() => {
        const images = devices
            .map((device) => {
                const imageMap = overlayImageMap[device.deviceType];
                return imageMap ? imageMap[device.status === 1 ? 'on' : 'off'] : null;
            })
            .filter((image): image is string => image !== null);
        setOverlayImages(images);
    }, [devices]);

    return (
        <div className="modii-room">
            <Image
                src="/images/room.png"
                alt="room image"
                className="absolute"
                style={{
                    objectFit: 'cover',
                    paddingLeft: 50,
                    paddingRight: 50
                }}
                width={384}
                height={344}
            />

            {overlayImages.map((src, index) => (
                <Image
                    key={index}
                    src={src}
                    alt={`overlay image ${index}`}
                    width={384}
                    height={344}
                    className="absolute"
                    style={{
                        paddingLeft: 50,
                        paddingRight: 50,
                        objectFit: 'cover',
                        zIndex: 100 + index,
                    }}
                />
            ))}
        </div>
    );
}
