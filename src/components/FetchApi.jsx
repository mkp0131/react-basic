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
