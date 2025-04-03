import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import "./SlotMachine.css";
import Reel from "./Reel";
import Croupier from "./Croupier";
import { useUser } from "./UserContext";
import StatusBar from "./StatusBar";
interface ReelAnimation {
  0: React.CSSProperties;
  1: React.CSSProperties;
  2: React.CSSProperties;
}
function SlotMachine() {
  const { user, updateUser } = useUser();
  const { buttons, updateButtons } = useUser();
  const { shop, updateShop } = useUser();
  const [dialogueMessage, setDialogueMessage] = useState<string>(
    `Hello, gambler :) Have a spin!`
  );
  const [reelsNumbers, setReelsNumbers] = useState<{
    0: number[];
    1: number[];
    2: number[];
  }>({
    0: Croupier.generateReel(),
    1: Croupier.generateReel(),
    2: Croupier.generateReel(),
  });

  const [drawnNumbers, setDrawnNumbers] = useState<{
    0: number[];
    1: number[];
    2: number[];
  }>({ 0: [], 1: [], 2: [] });

  const [isBonusWon, checkIfBonusWon] = useState<boolean>(false);
  const [payLine, setPayLine] = useState<number[]>([]);
  useEffect(() => {
    setPayLine((prevPayline) => {
      const result: number[] = [...prevPayline];
      const updatePayline = (key: 0 | 1 | 2) => {
        if (drawnNumbers[key].length === 3) {
          result[key] = drawnNumbers[key][1];
        }
      };
      Object.keys(drawnNumbers).forEach((key) =>
        updatePayline(Number(key) as 0 | 1 | 2)
      );
      return result;
    });
    setReelsNumbers((prevReelsNumbers) => {
      const result: {
        0: number[];
        1: number[];
        2: number[];
      } = { ...prevReelsNumbers };
      const updateReels = (key: 0 | 1 | 2) => {
        if (drawnNumbers[key].length === 3) {
          result[key] = [
            ...drawnNumbers[key],
            ...prevReelsNumbers[key].slice(3),
          ];
        }
      };
      Object.keys(prevReelsNumbers).forEach((key) =>
        updateReels(Number(key) as 0 | 1 | 2)
      );
      return result;
    });
    checkIfBonusWon(() => {
      return Croupier.isBonusWon(drawnNumbers);
    });
  }, [drawnNumbers]);
  useEffect(() => {
    setIsStartButtonDisabled((prevState) => {
      if (payLine.length > 1 && isBonusWon) {
        return false;
      }
      console.log("🚫 Not entering IF block");
      return prevState;
    });
  }, [isBonusWon]);

  const [reelsStopButtonsDisabled, setReelsStopButtonsDisabled] = useState<
    boolean[]
  >([true, true, true]);
  const [isJackPot, checkIfJackpot] = useState<boolean>(false);
  useEffect(() => {
    if (payLine.length > 2) {
      checkIfJackpot(Croupier.isJackpot(payLine));
      if (isJackPot) {
        alert("You hit a jackpot! Adding 100 points to your credit score :)");
        return;
      }
      checkIfBonusWon(Croupier.isBonusWon(drawnNumbers));
      if (isBonusWon) {
        updateUser({
          products: { ...user.products, spin: user.products.spin + 1 },
        });
        updateButtons({ activateDraw: false, activateSpin: false });
        setDialogueMessage(
          "You’ve matched 3 or more of the same dessert. I added one bonus spin to your account!"
        );
      } else {
        updateButtons({ activateDraw: false, activateSpin: false });
        setDialogueMessage(
          "You were unlucky :/ Spend some credits if you want another spin!"
        );
      }
    }
  }, [payLine]);
  useEffect(() => {
    console.log("checking if jackpot");
    if (isJackPot) {
      updateUser({
        credits: user.credits + 90,
      });
      updateButtons({ activateDraw: false, activateSpin: false });
      setDialogueMessage(
        "You hit a jackpot! Adding 100 credits to your account :)"
      );
    }
  }, [isJackPot]);

  const [reelAnimation, setReelAnimation] = useState<
    Record<0 | 1 | 2, React.CSSProperties>
  >({
    0: { animation: "" },
    1: { animation: "" },
    2: { animation: "" },
  });
  const [isStartButtonDisabled, setIsStartButtonDisabled] =
    useState<boolean>(false);
  const reels = [0, 1, 2];
  function startNewGame() {
    setReelAnimation((prevReelAnimation) => {
      let updatedReelAnimation = prevReelAnimation;
      updatedReelAnimation = {
        0: { animation: "1s linear 0s infinite normal none running spin" },
        1: { animation: "1s linear 0s infinite normal none running spin" },
        2: { animation: "1s linear 0s infinite normal none running spin" },
      };
      return updatedReelAnimation;
    });
    setDialogueMessage("Spinnin....");
    updateButtons({ startSpin: true });
    setReelsStopButtonsDisabled([false, false, false]);
    setDrawnNumbers({ 0: [], 1: [], 2: [] });
    setPayLine([]);
    checkIfBonusWon(false);
  }
  function activateSpin() {
    if (user.products.spin > 0) {
      updateUser({
        products: { ...user.products, spin: user.products.spin - 1 },
      });
      updateButtons({
        activateDraw: true,
        activateSpin: true,
        startSpin: false,
      });
      setDialogueMessage("Bonus spin is active! Have another go :)");
    } else {
      alert("You are out of bonus spins, I am sorry :(");
    }
  }
  return (
    <>
      <div className="container">
        <StatusBar></StatusBar>
        <div className="row">
          <div className="col text-center">
            <h4 className="dialogue-message">{dialogueMessage}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-center text-center">
          <div className="row" id="slot-screen">
            {reels.map((reel, index) => (
              <Reel
                key={index}
                reelIndex={index}
                setDrawnNumbers={setDrawnNumbers}
                setReelsStopButtonsDisabled={setReelsStopButtonsDisabled}
                setIsStartButtonDisabled={setIsStartButtonDisabled}
                reelsStopButtonsDisabled={reelsStopButtonsDisabled}
                reelAnimation={reelAnimation}
                setReelAnimation={setReelAnimation}
                payLine={payLine}
                isBonusWon={isBonusWon}
                reelsNumbers={reelsNumbers}
              />
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-start"
              type="button"
              onClick={startNewGame}
              disabled={buttons.startSpin}
            >
              Start!
            </button>
            <button
              className="btn btn-activate"
              disabled={buttons.activateSpin}
              onClick={activateSpin}
            >
              Activate bonus spin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlotMachine;
