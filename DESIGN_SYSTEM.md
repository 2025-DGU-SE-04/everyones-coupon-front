# 🎨 모두의 쿠폰 - 디자인 시스템 가이드

## 📋 목차
1. [색상 팔레트](#색상-팔레트)
2. [타이포그래피](#타이포그래피)
3. [스페이싱](#스페이싱)
4. [컴포넌트 가이드](#컴포넌트-가이드)
5. [반응형 디자인](#반응형-디자인)
6. [UX 원칙](#ux-원칙)

---

## 🎨 색상 팔레트

### Primary (메인 브랜드 컬러)
- **Primary-500**: `#3b82f6` - 메인 액션 버튼, 링크
- **Primary-600**: `#2563eb` - 호버 상태
- **Primary-700**: `#1d4ed8` - 액티브 상태

### Secondary (보조 컬러)
- **Secondary-50**: `#f8fafc` - 배경
- **Secondary-100**: `#f1f5f9` - 카드 배경
- **Secondary-200**: `#e2e8f0` - 테두리
- **Secondary-500**: `#64748b` - 보조 텍스트
- **Secondary-700**: `#334155` - 본문 텍스트
- **Secondary-900**: `#0f172a` - 제목 텍스트

### Success (성공/유효)
- **Success-500**: `#22c55e` - 성공 메시지, 유효 표시

### Warning (경고/주의)
- **Warning-500**: `#f59e0b` - 오피셜 배지

### Danger (삭제/위험)
- **Danger-500**: `#ef4444` - 삭제 버튼, 에러 메시지

---

## 📝 타이포그래피

### 제목 계층
- **H1**: `text-3xl` (1.875rem) / `font-bold` - 페이지 제목
- **H2**: `text-2xl` (1.5rem) / `font-bold` - 섹션 제목
- **H3**: `text-xl` (1.25rem) / `font-bold` - 서브 섹션

### 본문
- **Body Large**: `text-lg` (1.125rem) - 강조 본문
- **Body**: `text-base` (1rem) - 기본 본문
- **Body Small**: `text-sm` (0.875rem) - 보조 정보
- **Caption**: `text-xs` (0.75rem) - 캡션, 라벨

### 폰트 굵기
- **Bold**: `font-bold` (700) - 제목, 강조
- **Semibold**: `font-semibold` (600) - 버튼, 라벨
- **Medium**: `font-medium` (500) - 부제목
- **Normal**: `font-normal` (400) - 본문

---

## 📏 스페이싱

### 일관된 여백 규칙
- **카드 내부 패딩**: `p-5` (1.25rem)
- **섹션 간격**: `mb-6` (1.5rem)
- **요소 간격**: `gap-4` (1rem)
- **작은 간격**: `gap-2` (0.5rem)

### Border Radius
- **카드**: `rounded-2xl` (1rem)
- **버튼**: `rounded-xl` (0.75rem)
- **입력 필드**: `rounded-xl` (0.75rem)
- **배지**: `rounded-full` (완전한 원)

---

## 🧩 컴포넌트 가이드

### Button

#### Variants
- **primary**: 메인 액션 (등록, 제출)
- **secondary**: 보조 액션
- **danger**: 삭제, 위험한 작업
- **ghost**: 배경 없는 버튼
- **outline**: 테두리만 있는 버튼

#### Sizes
- **sm**: 작은 버튼 (관리자 액션)
- **md**: 기본 버튼
- **lg**: 큰 버튼 (주요 액션)

#### 사용 예시
```jsx
<Button variant="primary" size="lg" fullWidth>
  등록하기
</Button>
```

### Card
- **interactive**: 클릭 가능한 카드 (hover 효과)
- **elevated**: 그림자 효과

```jsx
<Card interactive elevated>
  {/* 내용 */}
</Card>
```

### Input / Textarea
- 일관된 스타일과 포커스 효과
- 에러 상태 표시 지원

```jsx
<Input
  label="쿠폰 번호"
  placeholder="예: CAPY500"
  error={error}
/>
```

### Badge
- 상태 표시용 작은 배지
- Variants: primary, success, warning, danger, secondary

```jsx
<Badge variant="warning" size="sm">
  오피셜
</Badge>
```

---

## 📱 반응형 디자인

### Breakpoints
- **모바일**: 기본 (0px~)
- **태블릿**: `sm:` (640px~)
- **데스크탑**: `lg:` (1024px~)

### 모바일 우선 접근
- 모바일에서 최적화된 레이아웃
- 데스크탑에서는 여백으로 확장

### 반응형 패턴
```jsx
// 텍스트 크기
className="text-2xl sm:text-3xl lg:text-4xl"

// 레이아웃
className="flex-col sm:flex-row"

// 패딩
className="px-4 sm:px-6 lg:px-8"
```

---

## 🎯 UX 원칙

### 1. 계층 구조
- **중요한 요소**: 크고, 진한 색상, 강한 그림자
- **보조 요소**: 작고, 연한 색상, 약한 그림자

### 2. 일관성
- 모든 버튼은 동일한 스타일 시스템 사용
- 모든 카드는 동일한 패딩과 반경
- 모든 입력 필드는 동일한 스타일

### 3. 피드백
- 호버 상태: 색상 변화, 그림자 강화
- 로딩 상태: 스피너 표시
- 에러 상태: 빨간색 강조

### 4. 접근성
- 포커스 링 표시
- 충분한 색상 대비
- 명확한 라벨

---

## 🎨 그림자 시스템

- **soft**: `shadow-soft` - 카드 기본
- **medium**: `shadow-medium` - 버튼, 호버
- **strong**: `shadow-strong` - 강조 요소

---

## 📐 레이아웃 가이드

### 컨테이너
- **최대 너비**: `max-w-2xl` (일반 페이지), `max-w-7xl` (관리자 대시보드)
- **패딩**: `px-4 sm:px-6 lg:px-8`

### 섹션 간격
- 페이지 상단: `py-6 sm:py-8`
- 섹션 간: `mb-6`
- 하단 여백: `pb-24` (모바일 네비게이션 고려)

---

## ✅ 체크리스트

새 컴포넌트를 만들 때:
- [ ] 디자인 시스템 색상 사용
- [ ] 일관된 스페이싱 적용
- [ ] 반응형 디자인 고려
- [ ] 접근성 (포커스, 라벨) 확인
- [ ] 호버/액티브 상태 구현
- [ ] 로딩/에러 상태 처리

