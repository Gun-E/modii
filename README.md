# MODII

LG전자 DX School 고객경험 향상 프로젝트로 진행한 AI 가전톡 서비스 프론트엔드 프로토타입입니다. 사용자의 일정, 취미, 보유 가전 정보를 바탕으로 가전이 먼저 활용 방법을 제안하는 대화형 서비스를 목표로 했습니다.

![MODII preview](https://github.com/user-attachments/assets/bb2dd8fb-c802-4a58-83e6-cfe3d618f25e)

## Overview

- 사용자의 생활 맥락에 맞춰 가전 활용을 제안하는 AI 대화 서비스
- 보유 가전 등록, 상태 확인, ON/OFF 전환 UI
- 가전별 대화 목록과 그룹 대화 화면
- 로그인 상태를 기준으로 화면 접근을 제어하는 인증 흐름
- 모바일 앱처럼 사용할 수 있는 393px 기준 프로토타입 UI

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- JWT

## Main Features

### AI Appliance Chat

사용자가 가전과 대화하는 경험을 중심으로 화면을 구성했습니다. 그룹 대화 화면에서는 사용자의 입력을 전송하고, AI 응답 생성 API를 호출한 뒤 대화 목록을 갱신하는 흐름을 구현했습니다.

### Device Status Control

냉장고, 에어컨, TV, 로봇청소기 등 보유 가전의 상태를 화면에 표시하고, 상태 변경 요청을 API로 전달합니다. 방 이미지 위에 가전 상태별 오버레이를 겹쳐 사용자가 현재 상태를 직관적으로 확인할 수 있도록 구성했습니다.

### Local Cache

가전 정보와 대화 목록은 일정 시간 동안 `localStorage`에 캐싱해 불필요한 API 호출을 줄였습니다. 화면 전환 시에도 이전 데이터를 빠르게 보여주고, 캐시 만료 후 다시 서버 데이터를 불러오는 방식으로 구현했습니다.

### Auth Flow

로그인 성공 시 JWT를 브라우저에 저장하고, 인증 상태에 따라 보호된 페이지 접근을 제어합니다. 로그아웃 시 토큰을 제거하고 로그인 페이지로 이동하도록 구성했습니다.

## Project Structure

```text
src
├── app
│   ├── context
│   ├── create
│   ├── login
│   ├── profile
│   ├── settings
│   └── talk
├── components
├── context
├── types
└── utils
```

## Getting Started

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## Result

LG전자 DX School 고객경험 향상 프로젝트에서 사용자의 생활 맥락을 데이터로 구조화하고, AI 기능을 실제 서비스 흐름에 연결하는 방식으로 기획과 구현을 진행했습니다. 이 프로젝트를 통해 AI 서비스는 모델 자체보다 사용자의 다음 행동으로 이어지는 화면과 데이터 흐름이 중요하다는 점을 경험했습니다.
