import logo from "./logo.svg";
import "./App.css";
import Counter from "./components/Counter";
import { useState } from "react";
import AppXY from "./components/AppXY";
import Mentor from "./components/Mentor";
import Mentors from "./components/Mentors";
import AppTheme from "./components/AppTheme";
import FetchApi from "./components/FetchApi";
import BlockButton from "./components/BlockButton";

function App() {
  const [total, setTotal] = useState(0);

  let flag = "asda1231da";
  flag = null;
  // flag = false;
  // flag = undefined;

  return (
    <>
      <div className="text-3xl">안녕</div>
      <BlockButton flag />
    </>
  );
}

export default App;
