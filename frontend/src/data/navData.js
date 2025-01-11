/**
 * Filename: navData.js
 * Author: Chace Nielson
 * Date Created: January 11, 2025
 * Last Updated: January 11, 2025
 * Description: 
 *   Contains static data and animation variants used in the navigation bar for the Pageflow Library app. 
 *   This includes menu items, icons, default image paths, and animation configurations for slide-in menus.
 * Dependencies:
 *   - "@/globals": Provides the `IMAGE_PREFIX` constant for static image paths.
 *   - react-icons/fa: Icon library for rendering Font Awesome icons.
 */

import { IMAGE_PREFIX } from "@/globals";
import { 
  FaBars, 
  FaTimes, 
  FaCogs, 
  FaUpload, 
  FaBook, 
  FaHeart, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt, 
  FaEllipsisV 
} from "react-icons/fa";

// Navigation configuration for the app
export const navData = {
  // Link for the logo that redirects to the home page
  logoLink: "/",

  // Icons for the hamburger menu (open and close states)
  hamburgerMenuIcons: { 
    open: <FaBars size={24}/>, 
    close: <FaTimes size={24}/> 
  },

  // Button for browsing books
  browseButton: { 
    searchTitle:"Search",
    label: "Browse Books", 
    icon: null, 
    href: "/browse" 
  },

  // Button for opening additional menu options
  menuButton: { 
    label: "Menu", 
    icon: <FaEllipsisV /> 
  },

  // Menu items displayed for users who are not signed in
  noUserItems: [
    { label: "Sign In", icon: <FaSignInAlt />, href: "/auth/sign-in" },
    { label: "Sign Up", icon: <FaUserPlus />, href: "/auth/sign-up" },
  ],

  // Dropdown menu items for signed-in users
  userDropdownItems: [
    { label: "My Books", icon: <FaBook />, href: "/my-books" },
    { label: "Favorites", icon: <FaHeart />, href: "/favorites" },
    { label: "Upload", icon: <FaUpload />, href: "/upload" },
    { label: "Settings", icon: <FaCogs />, href: "/settings" },
    // Special item for logging out, with a logout action instead of a link
    { label: "Logout", icon: <FaSignOutAlt />, logoutAction: true },
  ],

  // Default profile image path (used when a user has no profile picture)
  defaultImg: `${IMAGE_PREFIX}/misc/defaultProfilePic.jpg`,
};

// Animation variants for sliding navigation bar
export const slideVariants = {
  // Initial hidden state: slide off-screen to the left
  hidden: { x: "-100%" },

  // Visible state: slide into view
  visible: { x: 0 },

  // Exit state: slide off-screen to the left
  exit: { x: "-100%" },
};

// Animation variants for the overlay background
export const overlayVariants = {
  // Initial hidden state: fully transparent
  hidden: { opacity: 0 },

  // Visible state: semi-transparent background
  visible: { opacity: 0.5 },

  // Exit state: fully transparent
  exit: { opacity: 0 },
};
