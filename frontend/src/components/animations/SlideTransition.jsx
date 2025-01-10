/**
 * @file SlideTransition.jsx
 * @module SlideTransition
 * @desc React component that provides a sliding transition effect for route changes in Next.js.
 * This component uses the framer-motion library to create smooth slide-in and slide-out animations.
 * The slide direction, duration, delay, and translation distance are customizable through props.
 *
 * @component SlideTransition
 * 
 * @requires react
 * @requires motion from 'framer-motion'
 * @requires useRouter from 'next/router'
 * 
 * @see {@link https://reactjs.org/docs/getting-started.html | React Documentation}
 * @see {@link https://www.framer.com/motion/ | Framer Motion Documentation}
 * @see {@link https://nextjs.org/docs | Next.js Documentation}
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the transition.
 * @param {string} [props.enter='left'] - The direction from which the component enters ('left' or 'right').
 * @param {string} [props.exit='left'] - The direction to which the component exits ('left' or 'right').
 * @param {number} [props.duration=0.3] - The duration of the slide animation in seconds.
 * @param {number} [props.delay=0.1] - The delay before the animation starts in seconds.
 * @param {number} [props.translationDist=100] - The translation distance for the slide effect in pixels.
 * 
 * @returns {JSX.Element} The SlideTransition component that wraps its children with a slide animation.
 * 
 * @example
 * // Example usage of SlideTransition component
 * import SlideTransition from './SlideTransition';
 * 
 * function App({ Component, pageProps }) {
 *   return (
 *     <SlideTransition enter="left" exit="right" duration={0.5}>
 *       <Component {...pageProps} />
 *     </SlideTransition>
 *   );
 * }
 * 
 * @exports SlideTransition
 * 
 * @author Chace Nielson
 * @since 2.1
 * @created 2024-07-28
 * @updated 2025-01-08
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // Use `usePathname` for route-based transitions in Next.js 13+

const SlideTransition = ({
  children,
  enter = "left",
  exit = "left",
  duration = 0.3,
  delay = 0.1,
  translationDist = 100,
}) => {
  // Ensure that transitions are based on the current pathname
  const pathname = usePathname(); // Get the current pathname instead of `useRouter`

  const movX = translationDist; // Set the x-axis translation distance

  // Animation variants for framer-motion
  const variants = {
    hidden: { opacity: 0, x: enter === "left" ? -movX : movX },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: exit === "left" ? -movX : movX },
  };

  // Animation transition configuration
  const transition = {
    type: "tween",
    duration: duration,
    ease: "easeInOut",
    delay: delay,
  };

  return (
    <motion.div
      key={pathname} // Use the current pathname as the animation key
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default SlideTransition;