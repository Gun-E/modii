"use client";
import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useState} from "react";

interface FavoriteDevice {
    deviceId: bigint;
    name: string;
    deviceType: string;
    image: string;
}

export default function Favorites() {
    const [favorites, setFavorites] = useState<FavoriteDevice[]>([]);

    useEffect(() => {
        fetch('http://192.168.219.107:8080/device/1/favorites')
            .then((response) => response.json())
            .then((data: FavoriteDevice[]) => {
                setFavorites(data);
            })
            .catch((error) => {
                console.error('Error fetching favorites data:', error);
            });
    }, []);

    return (
        <div className="favorites-body">
            <Link href="/" className="favorites-container">
                <div className="favorites-create">
                    <Image
                        src="/images/add.png"
                        alt="add icon"
                        style={{objectFit: 'cover'}}
                        width={24}
                        height={24}
                    />
                </div>
                <p className="favorites-create-p-tag">단짝 모디</p>
            </Link>

            {favorites.map((favorite) => (
                <Link href={`/talk/${favorite.deviceId}`} key={favorite.deviceId}>
                    <div className="favorites-container">
                        <div className="circle-favorites"
                             style={{backgroundColor: favorite.image}}>
                            <Image
                                src={`/images/${favorite.deviceType}.png`}
                                alt={favorite.deviceType}
                                style={{
                                    objectFit: 'cover'
                                }}
                                width={60}
                                height={60}
                            />
                        </div>
                        <p className="favorites-p-tag">{favorite.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
