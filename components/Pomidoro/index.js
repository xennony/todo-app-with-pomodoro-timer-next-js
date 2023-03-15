import { React, useState, useEffect } from "react";
import Image from "next/image";

const Pomidoro = ({ activeTab, setActiveTab }) => {
  const [startTimer, setStartTimer] = useState(false);
  // initial time in seconds
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  // format timeLeft to mm:ss
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let timerId;
    if (startTimer) {
      timerId = setInterval(() => {
        if (activeTab === "Focus") {
          setFocusTime((prev) => {
            if (prev === 0) {
              setActiveTab("Break");
              setFocusTime(25 * 60);
              setBreakTime(5 * 60);
              setStartTimer(false);
            }
            return prev - 1;
          });
        } else {
          setBreakTime((prev) => {
            if (prev === 0) {
              setActiveTab("Focus");
              setFocusTime(25 * 60);
              setBreakTime(5 * 60);
              setStartTimer(false);
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [startTimer, activeTab]);

  const restartTimer = () => {
    setFocusTime(25 * 60);
    setBreakTime(5 * 60);
    setStartTimer(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[0px] mb-[50px]">
      <p className="text-[64px] font-bold mb-[20px]">
        {activeTab === "Focus" ? formatTime(focusTime) : formatTime(breakTime)}
      </p>
      <div className="flex">
        {startTimer ? (
          <button
            onClick={() => setStartTimer(false)}
            className="btn px-4 bg-black text-white rounded-3xl ease-in-out duration-300"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setStartTimer(true)}
            className="btn px-8 bg-black text-white rounded-3xl ease-in-out duration-300"
          >
            Start
          </button>
        )}

        <Image
          src="/assets/restart.svg"
          width={20}
          height={25}
          className="ml-[20px] active:opacity-50 ease-out duration-100"
          onClick={restartTimer}
        />
      </div>
    </div>
  );
};

export default Pomidoro;
