// DeviceContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserDeviceInfoDTO } from '@/types/UserDeviceInfoDTO';

interface DeviceContextType {
    devices: UserDeviceInfoDTO[];
    toggleDeviceStatus: (deviceId: bigint, currentStatus: number) => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [devices, setDevices] = useState<UserDeviceInfoDTO[]>([]);

    useEffect(() => {
        fetch('https://aqueous-coast-82122-c626a44767e1.herokuapp.com/device/1')
            .then((response) => response.json())
            .then((data: UserDeviceInfoDTO[]) => {
                console.log('Fetched API Data:', data);
                setDevices(data);
            })
            .catch((error) => {
                console.error('Error fetching API data:', error);
            });
    }, []);

    const toggleDeviceStatus = async (deviceId: bigint, currentStatus: number) => {
        const newStatus = currentStatus === 0 ? 1 : 0;

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
        }
    };

    return (
        <DeviceContext.Provider value={{ devices, toggleDeviceStatus }}>
            {children}
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
