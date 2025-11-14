import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GoBackButton = ({ initialText = "Go Back", onClick, className = "" }) => {
  const [text, setText] = useState(initialText);

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 bg-gray-700 text-white rounded ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default GoBackButton;
