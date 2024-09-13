"use client";

import React from 'react';
import {useDevice} from '@/context/DeviceContext';
import Image from 'next/image';

const DeviceSwitchs: React.FC = () => {
    const {devices, toggleDeviceStatus} = useDevice();

    return (
        <div className="modii-device-status">
            {devices.map((device) => (
                <button
                    key={device.deviceId}
                    className="modii-device-status-child"
                    onClick={() => toggleDeviceStatus(device.deviceId, device.status)}
                    style={{position: 'relative', border: 'none', background: 'transparent', padding: 0}}
                >
                    <Image
                        src={device.status === 0 ? "/images/device_off.png" : "/images/device_on.png"}
                        alt="device image"
                        style={{objectFit: 'cover'}}
                        width={158}
                        height={89}
                    />
                    <h2 className="modii-device-text">{device.name}</h2>
                    <div
                        className="image-circle"
                        style={{backgroundColor: device.image}}></div>
                    <Image
                        src={`/images/${device.deviceType}.png`}
                        alt={`${device.deviceType} image`}
                        style={{
                            objectFit: 'cover',
                            position: "absolute",
                            bottom: 10,
                            right: 10
                        }}
                        width={50}
                        height={50}
                    />
                </button>
            ))}
        </div>
    );
};

export default DeviceSwitchs;
