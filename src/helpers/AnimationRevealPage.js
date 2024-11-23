import React from "react";
import tw from "twin.macro";

/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */
import { motion } from "framer-motion";
import useInView from "helpers/useInView";

const StyledDiv = tw.div`font-display h-full text-secondary-500 p-8 overflow-hidden`;
function AnimationReveal({ disabled, children }) {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    return (
      <AnimatedSlideInComponent
        key={i}
        direction={directions[i % directions.length]}
      >
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return <>{childrenWithAnimation}</>;
}

function AnimatedSlideInComponent({
  direction = "left",
  offset = 30,
  children,
}) {
  const [ref] = useInView(30);

  const x = { target: "0%" };

  if (direction === "left") x.initial = "-150%";
  else x.initial = "150%";

  /*initial={{ x: x.initial, height: '50%' }}
      animate={{ 
        x: inView && x.target,
        transitionEnd:{
          x: inView && 0
        }
      }}
      transition={{ type: "spring", damping: 100 }}*/
  return (
    <motion.section
      width={"100%"}
      initial={{ y: "90%", height: "60%", opacity: 0 }}
      animate={{ y: "50%", opacity: 1 }}
      transition={{
        ease: "easeOut",
        duration: 0.5,
      }}
      overflow={"hidden"}
      ref={ref}
    >
      {children}
    </motion.section>
  );
}

export default (props) => (
  <StyledDiv className="App">
    <AnimationReveal {...props} />
  </StyledDiv>
);
