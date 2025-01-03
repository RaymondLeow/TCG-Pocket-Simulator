// Probabilities for each tier (cumulative probabilities)

import {
  mewtwoPack,
  pikachuPack,
  charizardPack,
  mewPack,
  allPack,
  getImage,
} from "components/resources/Prizes";

// For the fourth roll
const tierProbabilitiesFourth = [
  { tier: "diamond2", chance: 0.9 },
  { tier: "diamond3", chance: 0.95 },
  { tier: "diamond4", chance: 0.9666 },
  { tier: "star1", chance: 0.99238 },
  { tier: "star2", chance: 0.99738 },
  { tier: "star3", chance: 0.9996 },
  { tier: "crown", chance: 1 },
];

// For the fifth roll (higher chance for better prizes)
const tierProbabilitiesFifth = [
  { tier: "diamond2", chance: 0.6 },
  { tier: "diamond3", chance: 0.8 },
  { tier: "diamond4", chance: 0.86664 },
  { tier: "star1", chance: 0.96952 },
  { tier: "star2", chance: 0.98952 },
  { tier: "star3", chance: 0.9984 },
  { tier: "crown", chance: 1 },
];

// Function to roll a prize based on probabilities
function getTier(probabilities) {
  const random = Math.random();
  for (const { tier, chance } of probabilities) {
    if (random <= chance) return tier;
  }
}

export function getPackType(packData) {
  switch (packData) {
    case "mewtwo":
      return mewtwoPack;
    case "pikachu":
      return pikachuPack;
    case "charizard":
      return charizardPack;
    case "mew":
      return mewPack;
    default:
      return allPack;
  }
}

export function getPackTypeData(packData) {
  switch (packData) {
    case "mew":
      return {prefix: "mythical-island", date: "2024/12"}
    default:
      return {prefix: "tcg", date: "2024/11"}
  }
}

// Function to roll and determine the prizes
export function gamble(packData) {
  const result = [];
  let prizes = [];
  let position = 0;

  const pack = getPackType(packData);
  const packTypeData = getPackTypeData(packData)
  const commonPack = packTypeData.prefix === "tcg" ? allPack : []

  // First three rolls always tier1
  for (let i = 0; i < 3; i++) {
    prizes = pack.diamond1.concat(commonPack.diamond1 ? commonPack.diamond1 : []);
    position = Math.floor(Math.random() * prizes.length);
    const prize = prizes[position];
    console.log(pack, prizes, prize, position, prizes.length)
    prize.tier = "diamond1";
    prize.image = getImage(prize.id, packTypeData);
    prize.packType = position >= pack.diamond1.length ? "all" : packData;
    result.push(prize);
  }

  // Fourth roll (use tierProbabilitiesFourth)
  const fourthTier = getTier(tierProbabilitiesFourth);
  prizes = pack[fourthTier].concat(Object.keys(commonPack).length > 0 ? commonPack[fourthTier] : []);
  position = Math.floor(Math.random() * prizes.length);
  const fourthPrize = prizes[position];
  console.log(pack, prizes, fourthPrize, position)
  fourthPrize.tier = fourthTier;
  fourthPrize.image = getImage(fourthPrize.id, packTypeData);
  fourthPrize.packType = position >= pack[fourthTier].length ? "all" : packData;
  result.push(fourthPrize);

  // Fifth roll (use tierProbabilitiesFifth)
  const fifthTier = getTier(tierProbabilitiesFifth);
  prizes = pack[fifthTier].concat(Object.keys(commonPack).length > 0 ? commonPack[fifthTier] : []);
  position = Math.floor(Math.random() * prizes.length);
  const fifthPrize = prizes[position];
  console.log(pack, prizes, fifthPrize, position)
  fifthPrize.tier = fifthTier;
  fifthPrize.image = getImage(fifthPrize.id, packTypeData);
  fifthPrize.packType = position >= pack[fifthTier].length ? "all" : packData;
  result.push(fifthPrize);

  return result;
}
