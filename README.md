# 모두의 쿠폰 (Everyone's Coupon)

게임 쿠폰을 한 곳에 모아 공유하고, 관리자 페이지에서 쿠폰 정보를 관리할 수 있는 웹 프론트엔드입니다. React 기반으로 제작되었으며, Tailwind CSS 디자인 시스템을 통해 일관된 UI를 제공합니다.

## 주요 기능
- **게임 검색 및 탐색**: 트렌딩 게임 목록 조회 및 키워드 검색으로 원하는 게임을 찾을 수 있습니다.
- **쿠폰 등록 및 공유**: 특정 게임 상세 페이지에서 쿠폰을 추가하고, 기존 쿠폰의 유효 여부에 투표할 수 있습니다.
- **게임 등록**: 사용자가 새로운 게임을 추가하여 커뮤니티 데이터베이스를 확장할 수 있습니다.
- **관리자 기능**: 관리자 로그인 후 게임/쿠폰 삭제, 오피셜 마크 설정, 대표 이미지 지정 등 운영 도구를 제공합니다.

## 기술 스택
- **Framework**: [Create React App](https://create-react-app.dev/) (React 19)
- **UI**: Tailwind CSS (커스텀 디자인 가이드는 `DESIGN_SYSTEM.md` 참고)
- **State/Context**: React Context API 사용
- **HTTP Client**: Axios
- **Routing**: React Router v7

## 요구 사항
- **Node.js**: 22.x (프로젝트 `package.json`의 engines 필수 조건)
- **npm**: Node.js에 포함된 npm 사용

## 설치 및 실행
1. 저장소 의존성 설치
   ```bash
   npm install
   ```

2. 개발 서버 실행
   ```bash
   npm start
   ```
   - 기본적으로 [http://localhost:3000](http://localhost:3000) 에서 앱이 열립니다.
   - 코드 변경 시 핫 리로딩됩니다.

3. 프로덕션 빌드 생성
   ```bash
   npm run build
   ```
   - `build/` 디렉터리에 최적화된 정적 파일이 생성됩니다.

4. 테스트 실행
   ```bash
   npm test
   ```
   - React Scripts가 제공하는 테스트 러너를 인터랙티브 모드로 실행합니다.

## 환경 설정
- 기본 백엔드 API 엔드포인트는 `src/api/gameApi.js`에 정의된 Azure App Service URL(`https://everyones-coupon-webapp.azurewebsites.net/api`)을 사용합니다.
- 별도의 환경 변수가 필요하지 않지만, 다른 백엔드를 사용하려면 해당 파일의 `BASE_URL`을 변경하세요.

## 프로젝트 구조
주요 디렉터리 개요:
```
src/
├─ api/               # Axios 기반 API 클라이언트
├─ components/        # 재사용 가능한 UI 컴포넌트 (배너, 카드, 버튼 등)
├─ context/           # 전역 상태 관리
├─ pages/             # 라우트별 페이지 컴포넌트 (홈, 게임 상세, 관리자 등)
├─ styles/            # Tailwind 및 공용 스타일
├─ index.js           # 애플리케이션 진입점
└─ App.js             # 라우팅 정의
```

## 주요 페이지
- `/` **홈**: 헤더 배너, 검색바, 트렌딩 게임 목록, 게임 추가 버튼을 표시합니다.
- `/game/:gameId` **게임 상세**: 게임 설명과 쿠폰 목록을 보여주며 쿠폰 유효성 투표를 지원합니다.
- `/game/:gameId/add-coupon` **쿠폰 등록**: 해당 게임에 새 쿠폰을 추가합니다.
- `/add-game` **게임 등록**: 새 게임을 등록합니다.
- `/admin/login` **관리자 로그인**: 쿠키 기반 인증을 통해 관리자 세션을 설정합니다.
- `/admin/dashboard` **관리자 대시보드**: 게임/쿠폰 관리 링크를 제공합니다.
- `/admin/game/:gameId` **관리자 게임 관리**: 오피셜 설정, 대표 이미지 등록, 쿠폰/게임 삭제 등을 수행합니다.

## 개발 가이드
- **코드 스타일**: CRA 기본 ESLint 구성을 사용합니다. 필요 시 `npm run lint` 또는 `npm run lint:fix`로 검사 및 자동 수정하세요.
- **디자인 가이드**: 색상, 타이포그래피, 간격 규칙은 [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)를 참고하세요.

## 배포
본 프로젝트의 프론트엔드 애플리케이션은 Azure Static Web Apps 환경에 배포되어 있으며, 아래 주소에서 접속할 수 있습니다:

👉 프론트엔드 배포 주소
https://zealous-sand-04c7aae00.3.azurestaticapps.net/

정적 파일은 npm run build 후 생성되는 build/ 디렉토리를 기반으로 배포됩니다.
백엔드 API 경로는 절대 URL(https://everyones-coupon-webapp.azurewebsites.net/api)을 사용하므로, 
배포 환경에서 CORS 설정이 올바르게 되어 있는지 확인해야 합니다.

## 문의 및 기여
- 이슈나 개선 사항은 GitHub 이슈로 남겨주세요.
- 풀 리퀘스트 제출 전 `npm test`와 `npm run lint`를 실행하여 기본 품질 기준을 충족해 주세요.