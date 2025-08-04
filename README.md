# 웹 OMR 카드 시뮬레이터

[**웹 OMR 카드 시뮬레이터**](https://yejunian.github.io/web-omr/)는 종이나 OMR 템플릿이 없더라도 인터넷이 가능한 환경이라면 어디서든지 OMR 카드로서 활용할 수 있는 웹 애플리케이션입니다.

## 기능 및 구조

- 객관식 단답형 응답 마킹
- 문항 수(1~200), 선택지 수(2~5) 설정
- 응답 초기화
- 브라우저에 상태 저장: 페이지에 재접속하더라도 이전 설정 및 마킹 상태 복원

## 기술 정보

### 기술 스택

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=fff) ![React](https://img.shields.io/badge/React-61dafb?logo=react&logoColor=000) ![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000?logo=cssmodules&logoColor=fff) ![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=fff) <br> ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?logo=github&logoColor=fff) ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-181717?logo=github&logoColor=fff)

### 로컬 실행

#### 선행 요구사항

- Node.js (Vite 7.0에서 Node.js 20.19 이상, 22.12 이상 요구)
- pnpm

#### 저장소 클론 및 의존성 설치

```sh
git clone https://github.com/yejunian/web-omr.git
cd web-omr
pnpm i
```

#### 실행

Base path가 `/web-omr/`이므로 웹 브라우저에서 열 때 경로에 유의합니다.

개발 서버를 실행하려면 `dev` 스크립트를 실행하고, 안내에 따라 웹 브라우저에서 `http://localhost:5173/web-omr/`을 엽니다.

```sh
pnpm dev
```

프로덕션으로 실행하려면 빌드 후 `preview` 스크립트를 실행하고, 안내에 따라 웹 브라우저에서 `http://localhost:4173/web-omr/`을 엽니다.

```sh
pnpm build
pnpm preview
```

로컬 네트워크의 다른 기기에서 접근 가능하도록 하려면 `dev`, `preview` 스크립트에 `--host` 옵션을 사용합니다. 스크립트 실행 후 나타나는 Network URL을 로컬 네트워크상 다른 기기의 웹 브라우저에서 엽니다.

```sh
pnpm dev --host
# 또는
pnpm build
pnpm preview --host
```

### 구현 특이사항

#### 상태 관리

전역 상태 관리를 위하여 Zustand를 사용합니다.

다만, Zustand의 “[Auto Generating Selectors](https://zustand.docs.pmnd.rs/guides/auto-generating-selectors)” 문서에서 제공하는 유틸 함수 `createSelectors()`를 가져와 사용하는 과정에서 두 가지 문제가 있었습니다.

첫째, 제공하는 함수 중간의 `as any`가 ESLint와 충돌합니다. 이전에 Text Builder를 만들 때 type predicate 함수를 작성하면서 `any`와 `object`로 인한 문제를 겪고 해결한 경험을 되짚어서, `as any`를 좀 더 명확하게 `as { [key: string]: unknown }`으로 변경하여 [해결](https://github.com/yejunian/web-omr/blob/9924a6ebad48a52fd328616bed4b4eec4cc40cc2/src/store/createSelectors.ts)했습니다.

- 참고: [How to make a TypeScript type guard without any or object?](https://stackoverflow.com/questions/62208244/how-to-make-a-typescript-type-guard-without-any-or-object)

둘째, 그러나 `createSelectors()`로 생성되는 `useOmrStore().use.something()`으로 전체 데이터를 담은 객체를 가져오면(여기서는 `answers` 객체, `useOmrStore().use.answers()`) 성능 문제가 따라왔습니다. 개별 문항의 선택지 상태를 변경하면 `answers` 객체가 새 객체로 교체되고, 전체 문항이 다시 렌더됩니다. 문항이 수십 개만 되어도 화면 업데이트가 눈에 띄게 느려집니다. 따라서 `createSelectors()`를 제거하고 `useOmrStore((store) => store.answer[questionNumber])` 형태로 개별 필드를 바로 가져올 수 있는 기본 방식으로 다시 되돌려서 성능 문제를 제거했습니다.
