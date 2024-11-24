// utils/mouseEvents.js

import { transform } from "framer-motion";

// Convert cursor position values
export const convertCursorPosition = (
  e,
  frame,
  rotateValue,
  transformValue
) => {
  const objectX = (e.nativeEvent.clientX - frame.left) / frame.width;
  const objectY = (e.nativeEvent.clientY - frame.top) / frame.height;

  return {
    rotateX: transform(objectY, [0, 1], [rotateValue, -rotateValue]),
    rotateY: transform(objectX, [0, 1], [-rotateValue, rotateValue]),
    x: transform(objectX, [0, 1], [-transformValue, transformValue]),
    y: transform(objectY, [0, 1], [-transformValue, transformValue]),
    shadowX: transform(objectX, [0, 1], [20, -20]),
    shadowY: transform(objectY, [0, 1], [60, 20]),
  };
};

// On mouse enter
export const handleMouseEnter = (e, setFrame) => {
  const currentElement = e.target.getBoundingClientRect();

  setFrame({
    width: currentElement.width,
    height: currentElement.height,
    top: currentElement.top,
    left: currentElement.left,
  });

  return currentElement;
};

// On mouse move
export const handleMouseMove = (
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
) => {
  const {
    rotateX: rx,
    rotateY: ry,
    x: xPos,
    y: yPos,
    shadowX: sx,
    shadowY: sy,
  } = convertCursorPosition(e, frame, rotateValue, transformValue);

  rotateX.set(rx);
  rotateY.set(ry);
  x.set(xPos);
  y.set(yPos);
  shadowX.set(sx);
  shadowY.set(sy);
};

// On mouse leave
export const handleMouseLeave = (rotateX, rotateY, x, y, shadowX, shadowY) => {
  rotateX.set(0);
  rotateY.set(0);
  x.set(0);
  y.set(0);
  shadowX.set(0);
  shadowY.set(40);
};
