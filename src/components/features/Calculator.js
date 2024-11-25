// Probabilities for each tier (cumulative probabilities)

import {
  mewtwoPack,
  pikachuPack,
  charizardPack,
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

function getPackType(packData) {
  switch (packData) {
    case "mewtwo":
      return mewtwoPack;
    case "pikachu":
      return pikachuPack;
    default:
      return charizardPack;
  }
}

// Function to roll and determine the prizes
export function gamble(packData) {
  const result = [];
  let prizes = [];

  const pack = getPackType(packData);

  // First three rolls always tier1
  for (let i = 0; i < 3; i++) {
    prizes = pack.diamond1.concat(allPack.diamond1);
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    prize.tier = "diamond1";
    prize.image = getImage(prize.id);
    prize.packType = pack;
    result.push(prize);
  }

  // Fourth roll (use tierProbabilitiesFourth)
  const fourthTier = getTier(tierProbabilitiesFourth);
  prizes = pack[fourthTier].concat(allPack[fourthTier]);
  const fourthPrize = prizes[Math.floor(Math.random() * prizes.length)];
  fourthPrize.tier = fourthTier;
  fourthPrize.image = getImage(fourthPrize.id);
  fourthPrize.packType = pack;
  result.push(fourthPrize);

  // Fifth roll (use tierProbabilitiesFifth)
  const fifthTier = getTier(tierProbabilitiesFifth);
  prizes = pack[fifthTier].concat(allPack[fifthTier]);
  const fifthPrize = prizes[Math.floor(Math.random() * prizes.length)];
  fifthPrize.tier = fifthTier;
  fifthPrize.image = getImage(fifthPrize.id);
  fifthPrize.packType = pack;
  result.push(fifthPrize);

  return result;
}
