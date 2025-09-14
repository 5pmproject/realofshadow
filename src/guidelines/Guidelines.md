# Realm of Shadows - Design System Guidelines

## 디자인 시스템 체계화

### 색상 토큰 (Color Tokens)
다크 판타지 테마를 위한 색상 팔레트를 CSS 변수로 정의하여 일관성 있는 색상 사용을 보장합니다.

```css
/* Primary Dark Fantasy Colors */
--dark-black: #0d0d0d;      /* 메인 배경색 */
--fantasy-gold: #d4af37;     /* 브랜드 컬러, 강조 요소 */
--blood-red: #8b0000;        /* 위험/에러 상태 */
--stone-gray: #2a2a2a;       /* 카드 배경, 보조 요소 */
--ancient-bronze: #cd7f32;   /* 액센트 컬러 */
```

### 타이포그래피 토큰 (Typography Tokens)
```css
/* Font Family */
--font-heading: 'Cinzel', serif;    /* 제목용 폰트 */
--font-body: 'Inter', sans-serif;   /* 본문용 폰트 */

/* Font Size Scale */
--text-xs: 0.75rem;    /* 12px - 캡션, 작은 라벨 */
--text-sm: 0.875rem;   /* 14px - 작은 텍스트 */
--text-base: 1rem;     /* 16px - 기본 본문 */
--text-lg: 1.125rem;   /* 18px - 강조 텍스트 */
--text-xl: 1.25rem;    /* 20px - 소제목 */
--text-2xl: 1.5rem;    /* 24px - 중간 제목 */
--text-3xl: 1.875rem;  /* 30px - 큰 제목 */
--text-4xl: 2.25rem;   /* 36px - 메인 제목 */
--text-5xl: 3rem;      /* 48px - 히어로 제목 */
```

### 간격 토큰 (Spacing Tokens)
```css
--spacing-xs: 0.25rem;   /* 4px - 미세 간격 */
--spacing-sm: 0.5rem;    /* 8px - 작은 간격 */
--spacing-md: 1rem;      /* 16px - 기본 간격 */
--spacing-lg: 1.5rem;    /* 24px - 중간 간격 */
--spacing-xl: 2rem;      /* 32px - 큰 간격 */
--spacing-2xl: 3rem;     /* 48px - 섹션 간격 */
--spacing-3xl: 4rem;     /* 64px - 대형 섹션 간격 */
--spacing-4xl: 6rem;     /* 96px - 특대 섹션 간격 */
```

## 컴포넌트 단위 작업 가이드

### 1. 컴포넌트 구조
모든 UI 요소는 재사용 가능한 컴포넌트로 분리하며, 다음 구조를 따릅니다:

```typescript
/**
 * 컴포넌트 설명 - JSDoc 필수
 * 
 * @description 컴포넌트의 목적과 기능
 * @features 주요 기능 목록
 * @responsive_behavior 반응형 동작 설명
 * @interactions 인터랙션 동작 설명
 * @accessibility 접근성 고려사항
 */

interface ComponentProps {
  // Props 타입 정의
}

export const Component: React.FC<ComponentProps> = ({}) => {
  // 컴포넌트 로직
  return (
    // JSX 구조
  );
};
```

### 2. 반응형 디자인 원칙
- **Mobile First**: 모바일 우선 설계
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px

### 3. 재사용성 원칙
- Props를 통한 유연한 설정
- 컴포지션 패턴 활용
- 단일 책임 원칙 준수

## 주석 및 설명 가이드

### 1. JSDoc 주석 필수 요소
모든 컴포넌트에는 다음 정보를 포함해야 합니다:

```typescript
/**
 * @description 컴포넌트 설명
 * @features 주요 기능 나열
 * @responsive_behavior 반응형 동작 설명
 * @interactions 사용자 인터랙션 설명
 * @accessibility 접근성 고려사항
 * @performance 성능 최적화 사항
 */
```

### 2. 코드 내 주석 규칙
```typescript
// 섹션별 주석 - 코드 블록 설명
/* 복잡한 로직 설명 */
{/* JSX 주석 - UI 요소 설명 */}
```

## 성능 및 접근성 가이드

### 성능 최적화
- 이미지 지연 로딩 및 fallback 제공
- 애니메이션 cleanup 처리
- 불필요한 리렌더링 방지

### 접근성 준수
- WCAG 2.1 AA 수준 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 색상 대비 유지

<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
