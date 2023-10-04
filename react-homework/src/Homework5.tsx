import "./App.css";
import { useState } from "react";

export default function Homework5() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState(0);

  const handleButtonClick = () => {
    const sum = parseInt(value1) + parseInt(value2);
    setResult(sum);
  };
  return (
    <div className="hw5-container">
      <input
        type="text"
        value={value1}
        className="textbox"
        onChange={(e) => setValue1(e.target.value)}
      />

      <input
        type="text"
        value={value2}
        className="textbox"
        onChange={(e) => setValue2(e.target.value)}
      />

      <button type="button" className="btn-primary" onClick={handleButtonClick}>
        Calculate
      </button>

      <input type="text" value={result} className="textbox" readOnly />

      <a href="/">Back</a>
    </div>
  );
}
