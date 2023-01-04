# 리액트 베이직

## [react] useReducer 사용법

- 사용법은 `redux` 와 아주 유사하다.
- [리듀서 생성] `reducer/personReducer.js` 파일을 생성한다.

```js
// action.type 지정
export const CHANGE_MENTOR_NAME = "CHANGE_MENTOR_NAME";
export const ADD_MENTOR = "ADD_MENTOR";
export const REMOVE_MENTOR = "REMOVE_MENTOR";

// 리듀서 함수 / 불변성을 유지
// prev: 객체(State)
// action: dispatch 에서 전달받은 파라미터
export default function personReducer(prev, action) {
  switch (action.type) {
    case CHANGE_MENTOR_NAME:
      const { mentorName, newName } = action;
      return {
        ...prev,
        mentors: prev.mentors.map((mentor) => {
          if (mentor.name === mentorName) {
            return { ...mentor, name: newName };
          }
          return mentor;
        }),
      };
    case ADD_MENTOR:
      const { newMentor } = action;
      return {
        ...prev,
        mentors: [...prev.mentors, { name: newMentor, title: "시니어" }],
      };

    case REMOVE_MENTOR:
      const { removeMentor } = action;
      return {
        ...prev,
        mentors: prev.mentors.filter((mentor) => mentor.name !== removeMentor),
      };

    default:
      throw Error(`알수없는 액션 타입 입니다. 타입: ${action.type}`);
      break;
  }
}
```

- `Hooks` 에 `useReducer` 를 사용하여 `state` 를 관리한다.

```js
const Mentors = () => {
  // Reducer 연결
  const [person, dispatch] = useReducer(personReducer, iniState);

  const changeMentorName = useCallback(() => {
    const mentorName = prompt("변경하고 싶은 멘토의 이름을 입력해주세요");
    const newName = prompt("멘토의 새로운 이름을 입력해주세요");
    // Reducer 에서 값을 변경
    dispatch({ type: CHANGE_MENTOR_NAME, mentorName, newName });
  }, []);
```

## [react] use-immer 사용

- 공식문서: https://www.npmjs.com/package/use-immer
- use-immer 는 `useState` 에 불변성을 추가한 것이다
- 복잡한 객체를 다룬다면 immer 를 사용하는게 엄청난 장점이다.

## 적용전

```js
const Mentor = () => {
  const [person, setPerson] = useState(iniState);

  const changeMentorName = useCallback(() => {
    const newName = prompt("멘토 이름을 입력해주세요.");

    setPerson((prev) => ({
      ...prev,
      mentor: { ...prev.mentor, name: newName },
    }));
  }, []);
```

## 적용후

```js
const Mentor = () => {
  const [person, updatePerson] = useImmer(iniState);

  const changeMentorName = useCallback(() => {
    const newName = prompt("멘토 이름을 입력해주세요.");

    updatePerson((draft) => {
      draft.mentor.name = newName;
    });
  }, []);
```

## ✅ 불변성을 지키지 않고 값을 변경하는 예제 immer

### [ {}, {} ] 형태 일시 객체 업데이트

```js
// 객체를 찾고
const mentor = person.mentors.find((m) => m.id === id);
// 객체의 값을 업데이트
menter.name = newName;
```

### [ {}, {} ] 형태 일시 객체 삭제

```js
// 객체의 index 를 찾고
const index = person.mentors.findIndex((m) => m.id === id);
// 배열에서 해당 index를 자른다.
person.mentors.splice(index, 1);
```

### [] 배열에 추가

```js
// [맨뒤] 배열에 push 해준다
person.mentors.push({ name, title });
// [맨앞]
person.mentors.unshift({ name, title });
```

## [react] context 기본사용

- 상태를 관리할 컨텍스트 Provider 컴포넌트를 생성하여 상태를 위에서 관리 할 수 있다.
- `context/DarkModeContext.jsx` 를 생성

```js
import { createContext, useState } from "react";

// 컨텍스트 생성
export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // 컨텍스트로 전달하고 싶은 state
  const [darkMode, setDarkMode] = useState(false);
  // setState 는 함수를 만들어서 전달
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // 생성한 컨텍스트의 Provider 로 하이오더 컴포넌트를 생성
  // value 속성을 통해 사용하고 싶은 값(state)을 전달
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
```

- 상태를 전달하기 원하는 컴포넌트에 앞에서 생성한 하이오더 컴포넌트를 감싸준다.

```js
import { DarkModeProvider, DarkModeContext } from "../context/DarkModeContext";

export default function AppTheme() {
  // 다크모드 컨텍스트 프로바이더로 값을 전달할 곳을 감싼다.
  return (
    <DarkModeProvider>
      <Header />
      <Main />
      <Footer />
    </DarkModeProvider>
  );
}
```

- `useContext()` 로 값을 꺼내어서 사용

```js
function ProductDetail() {
  // 다크모드 컨텍스트에서 전달한 값을 userContext로 꺼내어서 사용
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div>
      Product Detail
      <p>
        DarkMode:
        {darkMode ? (
          <span style={{ backgroundColor: "black", color: "white" }}>
            Dark Mode
          </span>
        ) : (
          <span>Light Mode</span>
        )}
      </p>
      <button onClick={() => toggleDarkMode()}>Toggle</button>
    </div>
  );
}
```

## [react] 커스텀 hook 만들기

- Hooks(함수들)는 값의 재사용이 아니라, 로직의 재사용을 위한 것이다.

- `hooks/useFetch.jsx` 파일을 생성

```js
import { useEffect, useState } from "react";

// 커스텀 Hook
// 앞에 use 를 붙인다!
// ✅ jsx 가 아닌 값(state)을 리턴한다.
const UseFetch = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadData(params) {
      try {
        const result = await fetch("/data/dummy.json");
        const json = await result.json();
        console.log(json);
        setStatus(result.status.toString());
      } catch (error) {
        console.error(error);
        setStatus(error.toString());
      }

      console.log("작업이 끝났습니다.");
    }

    loadData();
  }, []);

  return [status];
};

export default UseFetch;
```

- 컴포넌트에서 사용

```js
import { useEffect, useState } from "react";
import UseFetch from "../hooks/useFetch";

const FetchApi = () => {
  // 커스텀 Hook 으로 간단하게 표현
  const [status] = UseFetch();

  return (
    <>
      <h1>ajax 요청 보내는 중 입니다.</h1>
      <h2>{status}</h2>
    </>
  );
};

export default FetchApi;
```

## [react] 실험 일지

### render 요소 에 상관없이 사용되는 변수는 state 가 아닌 함수 내부에 변수로 선언해도 되는지?

가능! 예) clickFlag 같은 변수 사용가능,
But! useCallback() 을 사용한 함수에 작성하는 것이 좋다.
setState 가 실행되면 초기화된다.
변수를 사용하는 함수가 다른 스코프에서 새롭게 생성되기 때문인듯!

### props 에 키만 적을 경우 자식 컴포넌트에서 어떤 값으로 전달되는지

`true` 로 전달된다.
But! 전달하는 값이 존재하기만하면 그 값이 무엇이든 `true`로 전달된다.
심지어 `false`, `null`, `undefined` 도 `true` 로 전달

## [react] Post CSS, [component].module.css

CRA 에는 기본적으로 PostCSS 가 내장되어있다.

- 컴포넌트와 같은 폴더에 `컴포넌트 이름` + `.module.css` 로 된 파일을 생성한다.

```
BlockButton.jsx
BlockButton.module.css
```

- 컴포넌트에서 css 를 사용한다.

```js
// CSS 를 styles 라는 변수로 import
import styles from "./BlockButton.module.css";

// className 에 styleds + 'css 명' 으로 사용한다.
return (
  <div>
    <button className={styles.button} onClick={onClick}>
      버튼
    </button>
  </div>
);
```

- class 명을 여러개 사용할시

```js
<div className={`${styles.container1} ${styles.container2}`}>
  <h1>I have two Classes</h1>
</div>
```

## [react] tailwindcss

- 공식문서: https://tailwindcss.com/docs/installation

### 설치

```sh
npm install -D tailwindcss
npx tailwindcss init
```

- npx 명령어를 실행하면 `tailwind.config.js` 파일이 생성된다.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- css 에 tailwind css import

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- vscode 에서 tailwind 확장 프로그램을 사용하면 자동완성을 사용 할 수 있다.
