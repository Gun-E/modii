"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DeviceStatusDTO } from "@/types/DeviceStatusDTO";

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
    const [overlayImages, setOverlayImages] = useState<string[]>([]);

    useEffect(() => {
        fetch('http://192.168.219.68:8080/device/1/status')
            .then((response) => response.json())
            .then((data: DeviceStatusDTO[]) => {
                console.log('Fetched API Data:', data);
                const images = data
                    .map((item: DeviceStatusDTO) => {
                        const imageMap = overlayImageMap[item.deviceType];
                        return imageMap ? imageMap[item.status === 1 ? 'on' : 'off'] : null;
                    })
                    .filter((image): image is string => image !== null);
                setOverlayImages(images);
            })
            .catch((error) => {
                console.error('Error fetching API data:', error);
            });
    }, []);

    return (
        <div className="modii-room">
            <Image
                src="/images/room.png"
                alt="room image"
                style={{ objectFit: 'cover' }}
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
                        paddingLeft: 40,
                        paddingRight: 40,
                        objectFit: 'cover',
                        zIndex: 100 + index,
                    }}
                />
            ))}
        </div>
    );
}
