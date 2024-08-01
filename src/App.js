import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit() {
    if (inputValue) {
      let cleanedInput = "";
      let decimalFound = false;

      // Clean the input
      for (let char of inputValue) {
        if (char >= "0" && char <= "9") {
          cleanedInput += char;
        } else if ((char === "." || char === ",") && !decimalFound) {
          cleanedInput += ".";
          decimalFound = true;
        }
      }

      // Remove decimal point and convert to integer
      const wholeNumber = parseInt(cleanedInput.replace(".", ""), 10);

      // Convert to string, reverse, and parse back to integer
      const reversedNumber = parseInt(
        wholeNumber.toString().split("").reverse().join(""),
        10
      );
      const difference = Math.abs(wholeNumber - reversedNumber);

      setResult({
        original: wholeNumber,
        reversed: reversedNumber,
        difference: difference,
      });
    }
  }

  return (
    <div className="App">
      <div>
        Number:{" "}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {result && (
        <div>
          <p>Original number: {result.original}</p>
          <p>Reversed number: {result.reversed}</p>
          <p>Result (difference): {result.difference}</p>
        </div>
      )}
    </div>
  );
}
