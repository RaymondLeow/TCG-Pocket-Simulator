import React, { useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionTemplate,
  transform,
  AnimatePresence,
} from "framer-motion";

const image =
  "https://www.pokemon-zone.com/assets/uploads/2024/08/Venusaur-ex-genetic-apex-1.webp";

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = (err) => reject(err);
  });
};

const generateCards = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    offset: index * 5, // Ensures offset is calculated
    zIndex: count - index,
  }));

export default function ResponsivePicture() {
  // State to manage the stack and card animations
  const [cards, setCards] = useState([1, 2, 3, 4, 5]); // Initialize with 5 cards
  const [newStackVisible, setNewStackVisible] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null); // Track the hovered card index

  // State for hover effect
  const [frame, setFrame] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  // State for image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    preloadImage(image)
      .then(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  }, []);

  /* Constants */
  const rotateValue = 15;
  const transformValue = rotateValue * 2;
  const springValue = { stiffness: 400, damping: 30 };

  /* UseSpring MotionValues */
  const rotateX = useSpring(0, springValue);
  const rotateY = useSpring(0, springValue);
  const x = useSpring(0, springValue);
  const y = useSpring(0, springValue);
  const shadowX = useSpring(0, springValue);
  const shadowY = useSpring(30, springValue);

  const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0, 0, 68, 0.1))`;

  /* Convert cursor position values */
  const convertCursorPosition = (e, frame) => {
    const objectX = (e.nativeEvent.clientX - frame.left) / frame.width;
    const objectY = (e.nativeEvent.clientY - frame.top) / frame.height;

    rotateX.set(transform(objectY, [0, 1], [rotateValue, -rotateValue]));
    rotateY.set(transform(objectX, [0, 1], [-rotateValue, rotateValue]));
    x.set(transform(objectX, [0, 1], [-transformValue, transformValue]));
    y.set(transform(objectY, [0, 1], [-transformValue, transformValue]));

    shadowX.set(transform(objectX, [0, 1], [20, -20]));
    shadowY.set(transform(objectY, [0, 1], [60, 20]));
  };

  /* On Mouse Enter, get object frame and convert values */
  const handleMouseEnter = (e, index) => {
    const currentElement = e.target.getBoundingClientRect();
    setHoveredCardIndex(index); // Set the hovered card index

    setFrame({
      width: currentElement.width,
      height: currentElement.height,
      top: currentElement.top,
      left: currentElement.left,
    });

    convertCursorPosition(e, currentElement);
  };

  /* On Mouse Move, convert values */
  const handleMouseMove = (e) => {
    convertCursorPosition(e, frame);
  };

  /* On Mouse Leave, reset */
  const handleMouseLeave = (e) => {
    if (hoveredCardIndex !== null) {
      rotateX.set(0);
      rotateY.set(0);
      x.set(0);
      y.set(0);
      shadowX.set(0);
      shadowY.set(40);
      setHoveredCardIndex(null); // Reset hovered card index
    }
  };

  // Click handler to swipe card left
  const handleCardClick = () => {
    if (cards.length === 1) {
      // Animate the last card upwards when it's clicked
      setCards([]); // Remove the last card

      // Show new stack of cards
      setNewStackVisible(true);
      setTimeout(() => {
        setCards([1, 2, 3, 4, 5]); // Reset the stack with new cards
        setNewStackVisible(false);
      }, 500); // Duration of the slide-up animation
    } else {
      // Swipe the top card to the left (or another swipe action)
      setCards((prev) => prev.slice(1));
    }
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
        height: "100vh",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        perspective: 1200,
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      <motion.div
        style={{
          width: 458,
          height: 640,
          position: "relative",
        }}
      >
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              style={{
                width: 458,
                height: 640,
                position: "absolute",
                top: `${(index - 4) * 20}px`, // Slightly offset each card
                left: 0,
                cursor: "pointer",
                // zIndex: cards.length - index, // Ensure top card is always on top
                x,
                y,
                rotateX,
                rotateY,
                filter,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 10,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease-out", // Smooth slide animation
              }}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleCardClick}
              exit={{
                opacity: 0,
                //y: -400, // Slide the card upwards when clicked
                transition: { duration: 0.2 },
              }}
            />
          ))}
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
              width: 458,
              height: 640,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 10,
            }}
          >
            {/* Render the new stack of 5 cards */}
            {[1, 2, 3, 4, 5].map((_, index) => (
              <motion.div
                key={index}
                style={{
                  filter,
                  width: 458,
                  height: 640,
                  position: "absolute",
                  top: `${(index - 4) * 20}px`, // Slightly offset each card
                  left: 0,
                  cursor: "pointer",
                  // zIndex: 5 - index, // Ensure the first card is on top
                  backgroundImage: `url(${image})`,
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
}
