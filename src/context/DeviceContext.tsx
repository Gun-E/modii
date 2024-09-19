"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserDeviceInfoDTO } from '@/types/UserDeviceInfoDTO';

interface DeviceContextType {
    devices: UserDeviceInfoDTO[];
    toggleDeviceStatus: (deviceId: bigint, currentStatus: number) => Promise<void>;
    loading: boolean; // 로딩 상태를 추가합니다.
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

const CACHE_KEY = 'deviceData';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5분

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [devices, setDevices] = useState<UserDeviceInfoDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태를 추가합니다.

    useEffect(() => {
        const fetchDevices = async () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

            if (cachedData && cacheTimestamp) {
                const parsedTimestamp = parseInt(cacheTimestamp, 10);
                const currentTime = new Date().getTime();

                if (currentTime - parsedTimestamp < CACHE_EXPIRY_TIME) {
                    setDevices(JSON.parse(cachedData));
                    return;
                }
            }

            setLoading(true); // 데이터 요청 시작 시 로딩 상태 설정
            try {
                const response = await fetch('https://aqueous-coast-82122-c626a44767e1.herokuapp.com/device/1');
                const data: UserDeviceInfoDTO[] = await response.json();
                console.log('Fetched API Data:', data);

                // 캐시 저장
                localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime().toString());

                setDevices(data);
            } catch (error) {
                console.error('Error fetching API data:', error);
            } finally {
                setLoading(false); // 데이터 요청 완료 후 로딩 상태 해제
            }
        };
        fetchDevices();
    }, []);

    const toggleDeviceStatus = async (deviceId: bigint, currentStatus: number) => {
        const newStatus = currentStatus === 0 ? 1 : 0;

        setLoading(true); // 상태 변경 요청 시작 시 로딩 상태 설정
        try {
            await fetch(`https://aqueous-coast-82122-c626a44767e1.herokuapp.com/device/${deviceId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            setDevices((prevDevices) =>
                prevDevices.map((device) =>
                    device.deviceId === deviceId
                        ? { ...device, status: newStatus }
                        : device
                )
            );
        } catch (error) {
            console.error('Error updating device status:', error);
        } finally {
            setLoading(false); // 상태 변경 요청 완료 후 로딩 상태 해제
        }
    };

    return (
        <DeviceContext.Provider value={{ devices, toggleDeviceStatus, loading }}>
            {children}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </DeviceContext.Provider>
    );
};

export const useDevice = () => {
    const context = useContext(DeviceContext);
    if (context === undefined) {
        throw new Error('useDevice must be used within a DeviceProvider');
    }
    return context;
};
