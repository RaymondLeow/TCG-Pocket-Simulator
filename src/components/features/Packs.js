import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { gamble as fetchNewImages } from "./Calculator";
import {
  handleMouseEnter,
  handleMouseLeave,
  handleMouseMove,
} from "utils/MouseEvents";
import { useData } from "components/context/DataContext";
import styled from "styled-components";

const CardContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const NewIndicator = styled(motion.div)`
  position: absolute;
  top: -40px;
  background: red;
  width: 60px;
  color: white;
  height: 30px;
  z-index: 20;
  align-items: center;
  background: linear-gradient(145deg, #ff7598, #b91f5a);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const cardWidth = 367;
const cardHeight = 512;

const GlitterEffect = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 80px;
  height: 50px;
  border-radius: 50px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 0, 0.4),
    rgba(255, 223, 0, 0)
  );
  z-index: 0;
  pointer-events: none;
`;

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = (err) => reject(err);
  });
};

const Packs = ({ packData }) => {
  const { data, setData } = useData();

  // State to manage the stack and card animations
  const [cards, setCards] = useState([0, 1, 2, 3, 4]); // Initialize with 5 cards
  const [imageSet, setImageSet] = useState([]); // Initialize with an empty image set
  const [newStackVisible, setNewStackVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [stackCounter, setStackCounter] = useState(0);

  // State for hover effect
  const [frame, setFrame] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Preload images for the current stack
    if (imageSet.length > 0) {
      preloadImagesForStack(imageSet);
    } else {
      const newImages = fetchNewImages(packData, [0, 1, 2, 3, 4]); // Fetch new images for the stack
      setImageSet(newImages);
      preloadImagesForStack(newImages);
    }
  }, [imageSet]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip first render
      return;
    }
    setNewStackVisible(true);
    setCards([0, 1, 2, 3, 4]); // Reset the stack
    setImageLoaded(false); // Reset image loaded state for new stack

    fetchNewStack(); // Fetch new images for the next stack

    setTimeout(() => {
      setNewStackVisible(false); // Hide the new stack after animation
    }, 400); // Duration of the animation for sliding up
  }, [packData]);

  // Function to preload all images for the stack
  const preloadImagesForStack = async (imageSet) => {
    Promise.all(imageSet.map((img) => preloadImage(img.image)))
      .then(() => setImageLoaded(true))
      .catch((error) => console.error("Error loading images:", error));
  };

  // Function to fetch new images dynamically for the next stack
  const fetchNewStack = async () => {
    setStackCounter((prevCount) => prevCount + 1);
    setData(stackCounter);
    const newImages = await fetchNewImages(packData); // Fetch new images for the stack
    setImageSet(newImages); // Update image set
    setImageLoaded(false); // Reset loading state
  };

  /* Constants */
  const springValue = { stiffness: 400, damping: 30 };
  const rotateValue = 15;
  const transformValue = 30;

  const shadowX = useSpring(0, springValue);
  const shadowY = useSpring(30, springValue);
  const rotateX = useSpring(0, springValue);
  const rotateY = useSpring(0, springValue);
  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });
  const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 5px rgba(0, 0, 68, 0.4))`;

  // Click handler to swipe card left
  const handleCardClick = () => {
    if (cards.length === 1) {
      setData(imageSet[cards[0]]);
      setCards([0, 1, 2, 3, 4]); // Reset the stack
      setImageLoaded(false); // Reset image loaded state for new stack

      fetchNewStack(); // Fetch new images for the next stack

      setNewStackVisible(true);

      setTimeout(() => {
        setNewStackVisible(false); // Hide the new stack after animation
      }, 400); // Duration of the animation for sliding up
    } else {
      // Swipe the top card to the left (or another swipe action)
      setCards((prev) => prev.slice(1));
      setData(imageSet[cards[0]]);
    }
  };

  const onMouseEnter = (e) => {
    const currentFrame = handleMouseEnter(e, setFrame);
    handleMouseMove(
      {
        nativeEvent: { clientX: currentFrame.left, clientY: currentFrame.top },
      },
      currentFrame,
      rotateX,
      rotateY,
      x,
      y,
      shadowX,
      shadowY,
      rotateValue,
      transformValue
    );
  };

  const onMouseMove = (e) => {
    handleMouseMove(
      e,
      frame,
      rotateX,
      rotateY,
      x,
      y,
      shadowX,
      shadowY,
      rotateValue,
      transformValue
    );
  };

  const onMouseLeave = () => {
    handleMouseLeave(rotateX, rotateY, x, y, shadowX, shadowY);
  };

  const glitterEffectVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.4, 1, 0.4],
      transition: { duration: 1, repeat: Infinity, repeatType: "reverse" },
    },
  };

  let isNew = false;
  if (imageSet.length > 0) {
    const cardKey = cards[0];
    const { id, tier } = imageSet[cardKey];
    isNew = !data.history[tier].cards[id];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: imageLoaded ? 1 : 0,
        y: imageLoaded ? 0 : 10,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        height: "calc(100vh - 109px)",
        display: "flex",
        placeContent: "center",
        paddingTop: "3rem",
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      <motion.div
        style={{
          maxWidth: cardWidth,
          width: "calc(100% - 70px)",
          height: cardHeight,
          position: "relative",
        }}
      >
        <CardContainer>
          <AnimatePresence>
            {!newStackVisible &&
              imageSet.length > 0 &&
              cards.map((card, index) => {
                return (
                  <motion.div
                    key={`stack-${stackCounter}-card-${card}`}
                    style={{
                      height: 0,
                      width: "100%",
                      paddingTop: "139.509%",
                      position: "absolute",
                      top: `${(cards.length - index - 1) * 10}px`,
                      left: `${(index / cards.length) * 30}px`,
                      cursor: "pointer",
                      zIndex: cards.length - index,
                      rotateX: rotateX,
                      rotateY: rotateY,
                      filter,
                      backgroundImage: `url(${imageSet[card].image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: 10,
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                      imageRendering: "high-quality",
                    }}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={handleCardClick}
                    exit={{
                      x: -2000,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {index === 0 && isNew && (
                      <AnimatePresence>
                        <motion.div
                          key={`new-${stackCounter}-glitter-${card}`}
                          variants={glitterEffectVariants}
                          initial="hidden"
                          animate="visible"
                          style={{
                            position: "absolute",
                            top: "-40px",
                          }}
                        >
                          <GlitterEffect />
                        </motion.div>
                        <NewIndicator
                          initial={{ scale: 0, y: 5 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0, transition: { duration: 0.2 } }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 50,
                            duration: 0.1,
                          }}
                        >
                          NEW
                        </NewIndicator>
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </CardContainer>
        {/* New stack (appears from below) */}
        {newStackVisible && (
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 50,
              duration: 0.1,
            }}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 512,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 10,
            }}
          >
            {/* Render the new stack of 5 cards */}
            {[0, 1, 2, 3, 4].map((card, index) => (
              <motion.div
                key={card}
                style={{
                  filter,
                  height: 0,
                  width: "100%",
                  paddingTop: "139.509%",
                  position: "absolute",
                  top: `${(cards.length - index - 1) * 10}px`, // Slight offset for each card
                  left: `${(index / cards.length) * 30}px`,
                  zIndex: cards.length - index, // Ensure the top card is always on top
                  cursor: "pointer",
                  backgroundImage: `url(${imageSet[index].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 10,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Packs;
