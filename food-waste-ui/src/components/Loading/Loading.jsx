import * as React from "react";
import { motion } from "framer-motion";

("use strict");

export default function Loading() {
  const loaderVariants = {
    animationOne: {
      x: [-20, 20],
      y: [0, -30],
      transition: {
        x: {
          repeat: Infinity,
          duration: 0.5,
        },
        y: {
          repeat: Infinity,
          duration: 0.25,
        },
      },
    },
  };
  return (
    <motion.div
      className="loader"
      variants={loaderVariants}
      animate="animationOne"
    ></motion.div>
  );
}
