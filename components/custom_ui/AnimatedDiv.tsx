"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedDiv = ({ children }: { children: React.ReactNode }) => {
  // Create animation controls
  const controls = useAnimation();
  const textControls = useAnimation(); // Animation controls for the text div

  const [animationStarted, setAnimationStarted] = useState(false); // State to track if the animation has started

  useEffect(() => {
    // Function to start the animation on mouse button press
    const handleMouseDown = () => {
      setAnimationStarted(true); // Set animation started state to true
      controls.start({
        x: "25vw", // Move to the right
        scale: 1.75, // Scale up
        transition: {
          type: "spring",
          stiffness: 75,
          damping: 40,
        },
      });
    };

    // Attach the event listener to window or desired element
    // window.addEventListener("mousedown", handleMouseDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [controls]);

  // Trigger the text animation when the main animation starts
  useEffect(() => {
    if (animationStarted) {
      textControls.start({
        opacity: 1,
        x: "-75vh",
        transition: {
          duration: 1.5,
          ease: "easeOut",
        },
      });
    }
  }, [animationStarted, textControls]);

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Main animated div */}
      <motion.div
        className="w-fit h-auto text-white"
        initial={{ x: 0, scale: 1 }} // Start centered
        animate={controls} // Use controls for manual animation trigger
      >
        {children}
      </motion.div>

      {/* Text div to fade/slide in */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white"
        initial={{ opacity: 0, x: "-100vh" }} // Start hidden and slightly off to the left
        animate={textControls} // Control animation for text
      >
        This is your text that fades/slides in!
      </motion.div>
    </div>
  );
};

export default AnimatedDiv;
