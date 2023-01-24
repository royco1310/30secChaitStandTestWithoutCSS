import { useState, useEffect } from "react";
import { GoResult } from "./GoResult";
import { Result } from "./GoResult";
import { GoBack } from "./GoBack";
import React from "react";

export const BasicFormat = () => {
  const [time, setTime] = useState(0);
  const [timeOn, setTimeOn] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showTest, setShowTest] = useState(true);
  const [count, setCount] = useState(0);
  const options = [
    "Choose age",
    "60-64",
    "65-69",
    "70-74",
    "75-79",
    "80-84",
    "85-89",
    "90-94"
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const optionsGender = ["Choose gender", "Male", "Female"];
  const [selectedOptionGender, setSelectedOptionGender] = useState(
    optionsGender[0]
  );

  useEffect(() => {
    let interval = null;
    if (timeOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeOn]);

  useEffect(() => {
    if (time === 1000) {
      setTimeOn(false);
    }
  });

  const handleClickStart = () => {
    setTimeOn(true);
    console.log("you now clicked start button");
  };
  const handleClickStop = () => {
    setTimeOn(false);
    console.log("now you stopped the counter");
  };
  const handleClickReset = () => {
    setTime(0);
  };
  const handleClickResult = () => {
    setShowResult(true);
    setShowTest(false);
  };

  const handleClickGoBack = () => {
    setShowResult(false);
    setShowTest(true);
    setTime(0);
    setSelectedOption("Choose age");
    setSelectedOptionGender("Choose gender");
    setCount(0);
  };

  return (
    <>
      {showTest && (
        <div>
          <p>Choose age and gender</p>
          <div>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {options.map((option, index) => (
                <option key={option} value={option} disabled={index === 0}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedOptionGender}
              onChange={(e) => setSelectedOptionGender(e.target.value)}
            >
              {optionsGender.map((option, index) => (
                <option key={option} value={option} disabled={index === 0}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <p> Stopwatch</p>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
          {!timeOn && time === 0 && (
            <button className="button" onClick={handleClickStart}>
              START
            </button>
          )}
          {timeOn && (
            <button className="button" onClick={handleClickStop}>
              STOP
            </button>
          )}
          {!timeOn && time > 0 && (
            <button className="button" onClick={handleClickReset}>
              RESET
            </button>
          )}
          <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
          <br />
          {!timeOn && time === 1000 && (
            <GoResult handleClickResult={handleClickResult} />
          )}
        </div>
      )}

      {showResult && (
        <Result
          count={count}
          selectedOption={selectedOption}
          selectedOptionGender={selectedOptionGender}
        />
      )}

      <GoBack handleClickGoBack={handleClickGoBack} />
    </>
  );
};
