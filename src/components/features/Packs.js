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

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = (err) => reject(err);
  });
};

const Packs = ({ packData }) => {
  const { setData } = useData();

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
    setCards([0, 1, 2, 3, 4]); // Reset the stack
    setImageLoaded(false); // Reset image loaded state for new stack

    fetchNewStack(); // Fetch new images for the next stack

    setNewStackVisible(true);

    setTimeout(() => {
      setNewStackVisible(false); // Hide the new stack after animation
    }, 500); // Duration of the animation for sliding up
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
  const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0, 0, 68, 0.4))`;

  // Click handler to swipe card left
  const handleCardClick = () => {
    setData(stackCounter);
    if (cards.length === 1) {
      setCards([0, 1, 2, 3, 4]); // Reset the stack
      setImageLoaded(false); // Reset image loaded state for new stack

      fetchNewStack(); // Fetch new images for the next stack

      setNewStackVisible(true);

      setTimeout(() => {
        setNewStackVisible(false); // Hide the new stack after animation
      }, 500); // Duration of the animation for sliding up
    } else {
      // Swipe the top card to the left (or another swipe action)
      setCards((prev) => prev.slice(1));
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: imageLoaded ? 1 : 0,
        y: imageLoaded ? 0 : 10,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: "100vw",
        height: "calc(100vh - 109px)",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        perspective: 1200,
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      <motion.div
        style={{
          width: 367,
          height: 512,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -50,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "32px",
            fontWeight: "bold",
            width: 400,
            textAlign: "center",
          }}
        >
          Packs opened: {stackCounter}
        </div>
        <AnimatePresence>
          {!newStackVisible &&
            imageSet.length > 0 &&
            cards.map((card, index) => {
              return (
                <motion.div
                  key={`stack-${stackCounter}-card-${card}`}
                  style={{
                    width: 367,
                    height: 512,
                    position: "absolute",
                    // top: `${(index - 4) * -15}px`, // Slightly offset each card
                    top: `${(cards.length - index - 1) * 10}px`, // Slight offset for each card
                    left: `${(index / cards.length) * 30}px`,
                    cursor: "pointer",
                    zIndex: cards.length - index, // Ensure the top card is always on top
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
                    // opacity: 0,
                    x: -2000, // Smoothly swipe out left

                    // y: 1000, // Slide the card upwards when clicked
                    transition: { duration: 0.2 },
                  }}
                />
              );
            })}
        </AnimatePresence>
        {/* New stack (appears from below) */}
        {newStackVisible && (
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            style={{
              position: "absolute",
              bottom: 0,
              transform: "translateX(-50%)",
              width: 367,
              height: 512,
              // backgroundImage: `url(${imageSet[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 10,
            }}
          >
            {/* Render the new stack of 5 cards */}
            {[0, 1, 2, 3, 4].map((card, index) => (
              <motion.div
                key={index}
                style={{
                  filter,
                  width: 367,
                  height: 512,
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
                onClick={handleCardClick}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Packs;
