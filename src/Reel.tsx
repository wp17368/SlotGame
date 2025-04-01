import Croupier from "./Croupier";
import React, { useState, useEffect } from "react";
import SlotMachine from "./SlotMachine";
interface ReelAnimation {
  0: React.CSSProperties;
  1: React.CSSProperties;
  2: React.CSSProperties;
}
interface ReelProps {
  setDrawnNumbers: React.Dispatch<
    React.SetStateAction<{
      0: number[];
      1: number[];
      2: number[];
    }>
  >;
  setReelAnimation: React.Dispatch<React.SetStateAction<ReelAnimation>>;
  setReelsStopButtonsDisabled: React.Dispatch<React.SetStateAction<boolean[]>>;
  setIsStartButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  reelsStopButtonsDisabled: boolean[];
  reelsNumbers: { 0: number[]; 1: number[]; 2: number[] };
  reelIndex: number;
  reelAnimation: Record<0 | 1 | 2, React.CSSProperties>;
  payLine: number[];
  isBonusWon: boolean;
}
function Reel({
  setReelAnimation,
  setReelsStopButtonsDisabled,
  setIsStartButtonDisabled,
  setDrawnNumbers,
  reelsStopButtonsDisabled,
  reelsNumbers,
  reelIndex,
  reelAnimation,
  payLine,
  isBonusWon,
}: ReelProps) {
  function stopReels() {
    setDrawnNumbers((prevDrawnNumbers) => {
      const result = {
        ...prevDrawnNumbers,
        [reelIndex]: Croupier.drawThreeNumbers(),
      };

      return result;
    });
    setReelAnimation((prevReelAnimation) => {
      const updatedReelAnimation = {
        ...prevReelAnimation,
        [reelIndex as 0 | 1 | 2]: { animation: "" },
      };
      return updatedReelAnimation;
    });
    setReelsStopButtonsDisabled((prevState) => {
      const updatedState = [...prevState];
      updatedState[reelIndex] = true;
      return updatedState;
    });
  }

  return (
    <div className={`col p-0 reels`}>
      <div className="row slot">
        <div className="col" style={reelAnimation[reelIndex as 0 | 1 | 2]}>
          <ul>
            {reelsNumbers[reelIndex as 0 | 1 | 2].map((num, index) => (
              <li key={index} className="reel">
                <img src={`slot_icons/${num}.png`} alt={`Slot ${num}`} />
              </li>
            ))}
          </ul>
          <ul>
            {reelsNumbers[reelIndex as 0 | 1 | 2].map((num, index) => (
              <li key={index} className="reel">
                <img src={`slot_icons/${num}.png`} alt={`Slot ${num}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row stopBtn">
        <div className="col text-center">
          <button
            type="button"
            className="btn btn-dark"
            disabled={reelsStopButtonsDisabled[reelIndex]}
            onClick={stopReels}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reel;
