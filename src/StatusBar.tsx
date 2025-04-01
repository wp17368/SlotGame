import React, { useState } from "react";
import { useUser } from "./UserContext";
import activateSpin from "./SlotMachine";
import SlotMachine from "./SlotMachine";
interface statusBarProps {
  setIsStartButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isStartButtonDisabled: boolean;
}
function StatusBar({
  setIsStartButtonDisabled,
  isStartButtonDisabled,
}: statusBarProps) {
  const { user, updateUser } = useUser();
  const { buttons, updateButtons } = useUser();
  function activateSpin() {
    if (user.bonusSpins > 0) {
      updateUser({ bonusSpins: user.bonusSpins - 1 });
      updateButtons({
        activateDraw: true,
        activateSpin: true,
        startSpin: false,
      });
    } else {
      alert("You have no more bonus spins o use, I am sorry :(");
    }
  }
  return (
    <div className="status-bar row">
      {[
        { label: "Credits", value: user.credits },
        {
          label: "Bonus Spins",
          value: user.bonusSpins,
          button: (
            <button disabled={buttons.activateSpin} onClick={activateSpin}>
              Activate
            </button>
          ),
        },
        { label: "Bonus Draws", value: user.bonusDraws },
      ].map((item, index) => (
        <div className="col" key={index}>
          <p>
            {item.label}: {item.value}
          </p>
          {item.button}
        </div>
      ))}
      <div className="col">
        <button disabled={buttons.buyButton}>Buy</button>
      </div>
    </div>
  );
}

export default StatusBar;
