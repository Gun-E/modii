"use client";

import React, { useRef, useEffect, useState } from 'react';

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [hasCamera, setHasCamera] = useState(false);

    useEffect(() => {
        const getCameraStream = async () => {
            if (!videoRef.current) {
                console.error('비디오 참조가 없습니다');
                return;
            }

            try {
                console.log('카메라 스트림 요청 중...');
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                console.log('스트림:', stream);

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    console.log('비디오 요소에 스트림 설정 완료:', videoRef.current.srcObject);
                    setHasCamera(true);
                }
            } catch (error) {
                console.error('카메라 접근 오류:', error);
                setHasCamera(false);
            }
        };

        getCameraStream();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                console.log('스트림 종료:', stream);
                tracks.forEach((track) => {
                    track.stop();
                    console.log('트랙 종료:', track);
                });
            }
        };
    }, []); // 빈 배열을 의존성 배열로 사용하여 한 번만 실행

    return (
        <div className="camera-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {hasCamera ? (
                <video
                    ref={videoRef}
                    autoPlay
                    controls
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        backgroundColor: 'black',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            ) : (
                <p>카메라를 사용할 수 없습니다. 브라우저의 권한을 확인하고, 페이지를 새로고침 해보세요.</p>
            )}
        </div>
    );
}
