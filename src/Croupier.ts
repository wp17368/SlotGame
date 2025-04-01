const Croupier: any = {
  generateReel: function () {
    let result: number[] = [];
    while (result.length < 10) {
      let randomNumber = Math.floor(Math.random() * 10) + 1;
      if (!result.includes(randomNumber)) {
        result.push(randomNumber);
      }
    }

    return result;
  },
  drawThreeNumbers: function () {
    let result: number[] = [];
    while (result.length < 3) {
      let randomNumber = Math.floor(Math.random() * 10) + 1;
      result.push(randomNumber);
    }
    return result;
  },
  countDuplicates: function (stoppedReels: number[]) {
    return stoppedReels.reduce(
      (accumulatorObject: { [x: string]: any }, individualNumber: number) => {
        accumulatorObject[individualNumber] =
          (accumulatorObject[individualNumber] || 0) + 1;
        return accumulatorObject;
      },
      {}
    );
  },
  isJackpot: function (payLine: number[]): boolean {
    if (!payLine || payLine.length < 3) {
      return false;
    }

    return payLine.every((num) => num === payLine[0]);
  },
  isBonusWon: function (bonusZone: { 0: number[]; 1: number[]; 2: number[] }) {
    const hasDuplicates = (
      numbersObj: { 0: number[]; 1: number[]; 2: number[] },
      duplicateThreshold: number
    ): boolean => {
      const numberCounts: Record<number, number> = {};
      for (const key of Object.keys(numbersObj)) {
        const numberArray = numbersObj[key as unknown as 0 | 1 | 2];

        for (const num of numberArray) {
          numberCounts[num] = (numberCounts[num] || 0) + 1;

          if (numberCounts[num] >= duplicateThreshold) {
            return true;
          }
        }
      }
      return false;
    };
    return hasDuplicates(bonusZone, 3);
  },
};

export default Croupier;
