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
