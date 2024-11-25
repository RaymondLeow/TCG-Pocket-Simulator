import diamond1Image from "../../images/diamond1.png";
import diamond2Image from "../../images/diamond2.png";
import diamond3Image from "../../images/diamond3.png";
import diamond4Image from "../../images/diamond4.png";
import star1Image from "../../images/star1.png";
import star2Image from "../../images/star2.png";
import star3Image from "../../images/star3.png";
import crownImage from "../../images/crown.png";

export const TrackerData = {
  packsOpened: 0,
  uniqueTracker: {
    total: {
      title: "Total",
      maxUnique: 285,
      collected: 0,
    },
    mewtwo: {
      title: "Mewtwo",
      maxUnique: 80,
      collected: 0,
    },
    charizard: {
      title: "Charizard",
      maxUnique: 79,
      collected: 0,
    },
    pikachu: {
      title: "Pikachu",
      maxUnique: 80,
      collected: 0,
    },
    all: {
      title: "All",
      maxUnique: 46,
      collected: 0,
    },
  },
  history: {
    diamond1: {
      title: "Diamond 1",
      image: diamond1Image,
      cards: {},
    },
    diamond2: {
      title: "Diamond 2",
      image: diamond2Image,
      cards: {},
    },
    diamond3: {
      title: "Diamond 3",
      image: diamond3Image,
      cards: {},
    },
    diamond4: {
      title: "Diamond 4",
      image: diamond4Image,
      cards: {},
    },
    star1: {
      title: "Star 1",
      image: star1Image,
      cards: {},
    },
    star2: {
      title: "Star 2",
      image: star2Image,
      cards: {},
    },
    star3: {
      title: "Star 3",
      image: star3Image,
      cards: {},
    },
    crown: {
      title: "Crown",
      image: crownImage,
      cards: {},
    },
  },
};

export function updateTrackerData(trackerData, newData) {
  if (Number.isInteger(newData)) {
    trackerData.packsOpened = newData + 1;
    return trackerData;
  }

  const { id, tier, packType } = newData;

  if (!trackerData.history[tier].cards[id]) {
    trackerData.uniqueTracker.total.collected += 1;
    trackerData.uniqueTracker[packType].collected += 1;
    newData.counter = 1;
    trackerData.history[tier].cards[id] = newData;
  } else {
    trackerData.history[tier].cards[id].counter += 1;
  }
  return trackerData;
}
