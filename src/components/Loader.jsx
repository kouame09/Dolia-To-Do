import React from 'react';
import { motion } from 'framer-motion';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1a725b] z-50">
      <motion.img
        src="/icon.svg"
        alt="Loading"
        className="w-24 h-24"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }} // Pulsation
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />
    </div>
  );
}

export default Loader;