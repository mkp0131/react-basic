import { useCallback, useState } from "react";
import styles from "./BlockButton.module.css";

const BlockButton = () => {
  const [check, setCheck] = useState(0);
  let clickFlag = false;

  const onClick = useCallback(() => {
    if (clickFlag) {
      console.log("클릭되었습니다.");
    }
    clickFlag = true;

    setCheck((prev) => prev + 1);

    console.log("ok");
  }, []);

  // console.log("flag", flag);

  return (
    <div>
      <button className={"text-2xl"} onClick={onClick}>
        버튼
      </button>
    </div>
  );
};

export default BlockButton;
