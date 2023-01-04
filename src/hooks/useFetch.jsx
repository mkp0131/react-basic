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
