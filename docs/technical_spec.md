# BORA Logistics 기술 명세서 (Technical Specification)

이 문서는 보라로지스 디자인 제안용 허브의 기술적 구조와 구현 방식을 상세히 기록합니다.

## 🛠️ Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 📂 Project Structure
```text
src/
├── app/
│   ├── layout.tsx          # 전역 레이아웃 (최소화)
│   ├── page.tsx            # 메인 허브 (HubPortal 로드)
│   └── pillar/
│       ├── [id]/page.tsx   # 동기적 대응 (폴백용)
│       └── 1~8/page.tsx    # 각 시안별 정적 독립 구현체 (Full Main Screen)
├── components/
│   ├── HubPortal.tsx       # 시안 선택용 메인 셀렉터
│   └── MediaPlaceholder.tsx # 시각적 결과물 시뮬레이션용 플레이스홀더
└── lib/
    └── utils.ts            # Tailwind 클래스 병합 유틸리티
```

## 🧪 Core Components

### 1. MediaPlaceholder
정식 사진이나 영상 에셋이 없는 상태에서 시각적 깊이를 제공하기 위한 핵심 컴포넌트입니다.
- **Props**:
  - `label`: 대상 영역 설명 (예: "Global Port View")
  - `aspectRatio`: 'square' | 'video' | 'wide' (기본값: 'video')
  - `mood`: 'minimal' | 'dynamic' | 'standard' | 'eco' | 'cinematic' (배경 무드 결정)
- **Usage**:
  ```tsx
  <MediaPlaceholder label="Logistics Center" mood="cinematic" aspectRatio="wide" />
  ```

### 2. HubPortal
사용자가 8가지 시안을 선택할 수 있는 네비게이션 허브입니다. `framer-motion`의 `staggerChildren` 기법을 사용하여 순차적인 카드 등장 애니메이션이 적용되어 있습니다.

## 🎨 Global Styles & Layout
- **Independent Layout Strategy**: 프로젝트의 특성상 각 시안은 독립적인 '전체 화면 메인'이어야 하므로, `layout.tsx`에서는 전역 헤더/푸터를 포함하지 않습니다. 모든 헤더/푸터는 각 시안의 `page.tsx` 내부에 직접 구현되어 있습니다.
- **BORA Purple (#6A0DAD)**: 프로젝트 전반의 프라이머리 컬러로 사용되며, 시안의 성격에 따라 투명도와 명도를 조절하여 적용합니다.

## 📱 Responsiveness
- 모든 레이아웃은 모바일 우선(Mobile-First) 원칙을 따르며, Tailwind의 `md:`, `lg:`, `xl:` 접두사를 통해 반응형 그리드와 텍스트 크기를 제어합니다.

---
*최지막 업데이트: 2026-04-21*
