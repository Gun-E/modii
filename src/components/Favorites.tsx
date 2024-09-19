"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface FavoriteDevice {
    deviceId: bigint;
    name: string;
    deviceType: string;
    image: string;
}

const CACHE_KEY = 'favorites';
const CACHE_TIME_KEY = 'favorites_cache_time';
const CACHE_DURATION = 5 * 60 * 1000; // 5분(밀리초)

export default function Favorites() {
    const [favorites, setFavorites] = useState<FavoriteDevice[]>([]);

    useEffect(() => {
        // 현재 시간
        const now = new Date().getTime();

        // 캐시 데이터 및 저장 시간 확인
        const cachedFavorites = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);

        if (cachedFavorites && cacheTime) {
            const cachedTime = parseInt(cacheTime, 10);
            // 5분 이내에 저장된 캐시가 있으면 사용
            if (now - cachedTime < CACHE_DURATION) {
                setFavorites(JSON.parse(cachedFavorites));
                return;
            }
        }

        // 5분이 경과했거나 캐시가 없는 경우 API 호출
        fetch('https://aqueous-coast-82122-c626a44767e1.herokuapp.com/device/1/favorites')
            .then((response) => response.json())
            .then((data: FavoriteDevice[]) => {
                setFavorites(data);
                // API 호출 후 캐시 및 캐시 시간을 저장
                localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                localStorage.setItem(CACHE_TIME_KEY, now.toString());
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
