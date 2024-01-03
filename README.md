## 내 배캠 React 3기 A-6조  주특기플러스 - 리엑트 심화 프로젝트 

### 📢 프로젝트 개요

**23.12.26 ~ 24.01.02**

- 프로젝트명: D:Live(Drive Live)
- 주제: 차박을 하고 싶은 사람들에게 차박하기 좋은 장소를 소개해주는 공간
- 내용: 사용자들이 선호하는 차박 공간을 한눈에 볼 수 있는 공간, 본인이 차박하면서 좋았던 내용을 직접 올릴 수도 있으며 실시간으로 뜨고있는 차박장소 그리고 각 차박장소별로 추천하는 계절과 시설정보까지 한눈에 파악이 가능한 차박러들을 위한 서비스 공간 

###  👥 팀 소개

- 팀명: 6캔두잇
- 팀원: 안준표,권보라,이재환,한지연
 

### [💡 구현 기능](https://github.com/scseong/motitube/wiki/%EA%B8%B0%EB%8A%A5-%EB%AA%A9%EB%A1%9D#%ED%95%84%EC%88%98%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD)

#### 필수요구사항

1. **로그인/회원가입**
  - 로그인 기능, 회원가입 기능, 마이페이지, 구글로그인.
 
2. **마이페이지**
- 닉네임 변경과 사용자 정보 표시
  
3. **메인페이지**
- 카테고리 클릭 시 알고리즘에 해당되는 명소추천 카테고리 상세페이지 이동.
- 지금 뜨는 지역명소 슬라이드 이미지 카드( 이미지 클릭 시 지금 뜨는 명소 상세페이지 이동 네비게이션).
- 뷰 카테고리(마운틴뷰,리버뷰,오션뷰) 각 뷰마다 상세페이지로 이동.
  
4. **상세페이지& 등록페이지**
- 로그인 상태 일 경우 나만의 차박명소 등록, 차박로그 등록 기능.
- 간단한 지도 API 를 통한 위치 확인.
- 차박로그(이미지,프로필이미지,유저이름,리뷰글,위치, 차박로그 상세페이지 이동).
- 더보기 기능

**로그인,회원가입**
- 사용자가 이메일과 비밀번호를 입력할 수 있는 텍스트 필드와 전송 버튼.
- 회원가입(구글간편로그인 혹은 카카오톡칸편로그인).


**마이페이지**
- 프로필 사진등과 사용자 정보 표시.
- 프로필 사진 ,닉네임 등록,변경.

**차박로그/차박명소 등록페이지**
- 사진 업로드(다중 선택 후 업로드 기능),  태그(마운틴뷰,리버뷰,오션뷰),장소,제목,내용.

**상세페이지**
- 카테고리 상세페이지.  ※Figma 와이어프레임 참고
- 차박로그 상세페이지.  ※Figma 와이어프레임 참고
- 차박명소 상세페이지.  ※Figma 와이어프레임 참고

## 추가 구현 사항

- 댓글 좋아요 기능.
- 내 위치에 가까운 차박위치 찾아보기.
- 소셜로그인.
- 상세페이지 동영상 플레이어.

## 와이어프레임

https://www.figma.com/file/krblyCVSmNY4CMJ9X8HJXh/D%3ALive-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84

### 🚩 개발 내용

#### 💡 서비스 화면
##### 메인 페이지
 ![스크린샷 2024-01-03 120722](https://github.com/nbc-6candoit/react-dlive/assets/117058056/873a3bb4-2e0e-4853-9ee3-f6cc24e8c330)
![스크린샷 2024-01-03 120848](https://github.com/nbc-6candoit/react-dlive/assets/117058056/6bb0e8dc-ea01-4be7-a7d8-3c85ad8d2afd)
 
##### 로그인 페이지
![스크린샷 2024-01-03 120640](https://github.com/nbc-6candoit/react-dlive/assets/117058056/094516fc-39e9-4d9f-9573-8b492e4b9d49)

#### 마이페이지
![스크린샷 2024-01-03 122406](https://github.com/nbc-6candoit/react-dlive/assets/117058056/52e7cbbd-cd17-452d-90bf-14a686caf7d0)

#### 차박로그
![스크린샷 2024-01-03 121612](https://github.com/nbc-6candoit/react-dlive/assets/117058056/75fb42bf-861a-49f0-9c6e-d3b6fba8b4a0)

#### 뷰 상세정보
![스크린샷 2024-01-03 121030](https://github.com/nbc-6candoit/react-dlive/assets/117058056/3cbaec9f-4a1a-4ef8-9cf1-a8d719200c43)

#### 차박명소
![스크린샷 2024-01-03 121223](https://github.com/nbc-6candoit/react-dlive/assets/117058056/a382fece-68a8-44a1-bd51-14b0e938f0f9)

####
![스크린샷 2024-01-03 121856](https://github.com/nbc-6candoit/react-dlive/assets/117058056/e8b2ba1a-ac7a-4ab7-9ea9-551e8cbcdd74)

#### 💻 개발 환경
- IDE: Visual Studio Code
- OS: windows, Mac
- Package Manager: Yarn Classic (v1.22.19)
- React boilerplate: create-react-app

#### 📌 사용 기술
- javascript - 화면을 동적으로 그려주는 인터프리터 언어 
- React - 사용자와 상호작용할 수 있는 UI를 효율적으로 구현
- Redux Toolkit - 전역 상태 관리 도구
- React-router-dom - 클라이언트 사이드 라우팅. URL에 맞는 컴포넌트 렌더링
- Styled-components - 자바스크립트로 스타일 관리. 재사용이 쉬운 컴포넌트를 만들고 동적 스타일링 용이
- Firebase - 사용자 인증과 데이터베이스 등의 서버 기능 제공
- React Query - 비동기 관련 로직과 상태를 관리

  ##

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
