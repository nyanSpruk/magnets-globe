"use client";
import { useState, ReactNode, ReactElement, cloneElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlurOverlayProps {
  children: ReactElement; // Use ReactElement to directly manipulate props
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true); // State to control the overlay visibility

  // Function to handle click and trigger animation
  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative h-screen bg-[url('https://unpkg.com/three-globe@2.31.1/example/img/night-sky.png')]">
      {/* Main content that is blurred when overlay is visible */}
      <motion.div
        className={`transition-filter duration-1000 ease-in-out ${
          isVisible ? "filter blur-sm" : "filter blur-none"
        }`}
      >
        {/* Clone the child element and pass down props to avoid warning */}
        {cloneElement(children, { rotationEnabled: isVisible })}
      </motion.div>

      {/* Fullscreen Blur and Text Overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-[0.01] z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            onClick={handleClick} // Click to hide the blur and text
          >
            <motion.div
              className="text-center font-bold text-white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" },
              }}
              exit={{
                y: "-100vh",
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.75, ease: "easeOut" },
              }}
            >
              <h1 className="text-[4rem] tracking-[0.1em] font-semibold">
                Nik Jan Špruk
              </h1>
              <h2 className="text-2xl uppercase italic tracking-[0.75em] font-thin">
                presents
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlurOverlay;
