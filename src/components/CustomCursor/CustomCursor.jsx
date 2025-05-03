import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Track mouse movement always
    window.addEventListener("mousemove", moveCursor);

    // Add event listeners to all elements with the hoverable class
    const hoverableElements = document.querySelectorAll(".hoverable");
    hoverableElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverableElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: "20px",
        height: "20px",
        backgroundColor: "black",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      initial={{
        x: position.x - 10,
        y: position.y - 10,
        opacity: 0,
      }}
      animate={{
        x: position.x - 10, // Center the cursor
        y: position.y - 10,
        opacity: isHovering ? 1 : 0, // Show/hide on hover
        scale: isHovering ? 1.2 : 1, // Slight scale effect
      }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.1, // Fast movement
        opacity: { duration: 0.1 }, // Smooth fade
        scale: { duration: 0.1 }, // Smooth scale
      }}
    />
  );
};

export default CustomCursor;
