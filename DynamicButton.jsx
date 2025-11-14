import React, { useState } from "react";
import { motion } from "framer-motion";

const DynamicButton = ({ initialText = "+ Add User", onClick }) => {
  const [text, setText] = useState(initialText);

  return (
    <motion.button
      onClick={() => {
        if (onClick) onClick();
        // Optional: toggle text on click
        setText((prev) => (prev === initialText ? "Added!" : initialText));
      }}
      whileHover={{
        scale: 1.1,             // pop-up effect
        opacity: [1, 0.6, 1],   // blink effect
        transition: {
          duration: 0.6,
          repeat: Infinity,     // blink continuously while hovered
        },
      }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer select-none"
    >
      {text}
    </motion.button>
  );
};

export default DynamicButton;
