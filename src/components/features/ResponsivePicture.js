import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionTemplate, transform } from "framer-motion";

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
  const [cards, setCards] = useState(generateCards(5));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [newStack, setNewStack] = useState(false); // Track new stack animation
  const [frame, setFrame] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

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
  const convertCursorPosition = (e) => {
    // Ensure frame is available before accessing
    if (!frame) return;

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
  const handleMouseEnter = (e) => {
    const currentElement = e.target.getBoundingClientRect();

    setFrame({
      width: currentElement.width,
      height: currentElement.height,
      top: currentElement.top,
      left: currentElement.left,
    });

    convertCursorPosition(e);
  };

  /* On Mouse Move, convert values */
  const handleMouseMove = (e) => {
    convertCursorPosition(e);
  };

  /* On Mouse Leave, reset */
  const handleMouseLeave = (e) => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
    shadowX.set(0);
    shadowY.set(40);
  };

  /* Handle Click */
  const handleClick = () => {
    // Trigger swipe for all cards
    setCards((prevCards) => {
      return prevCards.map((card, index) => ({
        ...card,
        x: index === 0 ? -500 : 0, // Swipe left for the first card
      }));
    });

    if (cards.length === 1) {
      // Trigger new stack animation
      setNewStack(true);

      // Generate new stack after animation
      setTimeout(() => {
        setCards(generateCards(5));
        setNewStack(false);
      }, 500); // Match the animation duration
    } else {
      // Remove top card
      setCards((prevCards) => prevCards.slice(1));
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
      <div
        style={{
          position: "relative",
          width: 458,
          height: 640,
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={handleClick} // All cards swipe when clicked
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{
              y: newStack && index === 0 ? 200 : card.offset, // New stack starts below
              opacity: newStack && index === 0 ? 0 : 1, // Fade in for new stack
            }}
            animate={{
              y: card.offset, // Move to its stack position
              opacity: 1, // Fully visible
              x: card.x || 0, // Move horizontally based on swipe animation
            }}
            exit={{
              opacity: index === 0 && cards.length === 1 ? 0 : 1, // Fade out
              x: index === 0 ? (cards.length === 1 ? -1000 : 0) : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: `${card.offset}px`,
              left: `${card.offset}px`,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              zIndex: card.zIndex,
            }}
          >
            <motion.div
              style={{
                backgroundImage: `url(${image})`,
                height: 640,
                width: 458,
                borderRadius: 10,
                display: "flex",
                placeItems: "center",
                placeContent: "center",
                backgroundSize: "cover",
                backgroundPosition: "center",
                rotateX,
                rotateY,
                x,
                y,
                filter,
              }}
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
