// components/Iphone.tsx
import React from 'react';
import Image from 'next/image';

const Iphone: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div style={{
            position: 'relative',
            width: '700px',
            height: '1200px',
            margin: '0 auto',
            padding: '0',
            overflow: 'hidden', // 자식 요소가 화면을 넘을 경우 숨김 처리
            border: '1px solid #ccc',
        }}>
            <Image
                src="/images/목업 누끼.png"
                alt="iPhone"
                layout="fill"
                objectFit="cover"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1 // 화면 이미지를 자식 요소 위로 덮게 설정
                }}
            />
            <div style={{
                position: 'relative',
                width: '300px', // 예시: 자식 요소의 너비를 300px로 고정
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0, // 자식 요소를a 화면 이미지 아래로 설정
                overflow: 'auto', // 자식 요소가 화면을 넘을 경우 스크롤 처리
                boxSizing: 'border-box', // 패딩 및 경계선을 포함하여 크기 계산
                padding: '20px', // 자식 요소와 경계 사이에 공간을 추가
            }}>
                {children}
            </div>
        </div>
    );
};

export default Iphone;
