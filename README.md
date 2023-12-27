## 내 배캠 React 3기 A-6조  주특기플러스 - 리엑트 심화 프로젝트 

### 📢 프로젝트 개요

**23.12.26 ~ 24.01.02**

-프로젝트명: D:Live

###  👥 팀 소개

- 팀명: 6캔두잇
- 팀원: 안준표,권보라,이재환,한지연

### [💡 구현 기능](https://github.com/scseong/motitube/wiki/%EA%B8%B0%EB%8A%A5-%EB%AA%A9%EB%A1%9D#%ED%95%84%EC%88%98%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD)

#### 필수요구사항

**메인페이지**

- 네비게이션 헤더(로그인,마이페이지, 이미지 클릭 시 페이지 이동).
- 카테고리 클릭 시 알고리즘에 해당되는 명소추천 카테고리 상세페이지 이동.
- 지금 뜨는 지역명소 이미지 카드( 이미지 클릭 시 상세페이지 이동 네비게이션).
- 차박로그(이미지,프로필이미지,유저이름,리뷰글,위치, 차박로그 상세페이지  이동)
- 지도 API (지도에 있는 차박 위치 클릭 시 상세정보 보여주기)

**로그인,회원가입**

- 사용자가 이메일과 비밀번호를 입력할 수 있는 텍스트 필드와 전송 버튼.

**마이페이지**

- 프로필 사진등과 사용자 정보 표시.
- 프로필 사진 ,닉네임 등록,변경.

**차박로그/차박명소 등록페이지**

- 사진 업로드(다중 선택 후 업로드 기능),  태그(마운틴뷰,리버뷰,오션뷰,신설),장소,제목,내용.

**상세페이지**

- 카테고리 상세페이지.  ※Figma 와이어프레임 참고
- 차박로그 상세페이지.  ※Figma 와이어프레임 참고
- 차박명소 상세페이지.  ※Figma 와이어프레임 참고

## 추가 구현 사항

- 댓글 좋아요 기능
- 내 위치에 가까운 차박위치 찾아보기
- 소셜로그인
- 상세페이지 동영상 플레이어

## 와이어프레임

https://www.figma.com/file/krblyCVSmNY4CMJ9X8HJXh/D%3ALive-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84


### 🚩 개발 내용
#### 💻 개발 환경
- IDE: Visual Studio Code
- OS: windows, Mac
- Package Manager: Yarn Classic (v1.22.19)
- React boilerplate: create-react-app

#### 📌 사용 기술

- React - 사용자와 상호작용할 수 있는 UI를 효율적으로 구현
- Redux Toolkit - 전역 상태 관리 도구
- React-router-dom - 클라이언트 사이드 라우팅. URL에 맞는 컴포넌트 렌더링
- Styled-components - 자바스크립트로 스타일 관리. 재사용이 쉬운 컴포넌트를 만들고 동적 스타일링 용이
- Firebase - 사용자 인증과 데이터베이스 등의 서버 기능 제공
- React Query - 비동기 관련 로직과 상태를 관리

#### 📂 디렉토리 구조
```
📦 project
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┣ 📂assets
 ┃ ┣ 📂constants
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂component1
 ┃ ┃ ┃ ┣📜component1.jsx
 ┃ ┃ ┃ ┗📜styles.js
 ┃ ┃ ┣ 📂component2
 ┃ ┃ ┃ ┣📜component2.jsx
 ┃ ┃ ┃ ┗📜styles.js
 ┃ ┣ 📂hooks
 ┃ ┣ 📂mock
 ┃ ┣ 📂pages
 ┃ ┣ 📂shared
 ┃ ┣ 📂styles
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┗ 📂modules
 ┃ ┣ 📜App.jsx
 ┃ ┗ 📜index.js
 ┣ 📜.eslintrc
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜jsconfig.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜yarn.lock
```

- `api/` 서버와의 통신에 사용되는 코드
- `assets/` 멀티미디어 파일(이미지, 폰트)
- `constants/` 상수 (색상, 공유되는 값 등)
- `components/` 재사용 가능한 컴포넌트
- `hooks/` 커스텀 훅
- `mock/` 샘플 데이터
- `pages/` 라우팅되는 페이지 컴포넌트
- `shared/` 공통적으로 사용되는 리소스
- `styles/` 스타일 관련
- `redux/` 리덕스 관련 파일

### [📃 코드 컨벤션](https://github.com/dkswn/D-Live/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)

### [🚥 깃 전략](https://github.com/dkswn/D-Live/wiki/%EA%B9%83-%EC%A0%84%EB%9E%B5)
