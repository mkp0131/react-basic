import { useCallback, useState } from "react";
import "./AppXY.css";
import Pointer from "./Pointer";

const AppXY = () => {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });

  const onMouseMove = useCallback((event) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
  }, []);

  return (
    <div className="wrap" onMouseMove={onMouseMove}>
      <div
        className="pointer"
        style={{ left: position.x + "px", top: position.y + "px" }}
      ></div>
    </div>
  );
};

export default AppXY;
