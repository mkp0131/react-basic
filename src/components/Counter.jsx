import React, { useState } from "react";

const Counter = ({ setTotal }) => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((prev) => prev + 1);
    setTotal((prev) => prev + 1);
  };

  return (
    <div>
      <h3>{count}</h3>
      <button onClick={onClick}>+</button>
    </div>
  );
};

export default Counter;
