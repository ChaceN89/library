import { IMAGE_PREFIX } from "@/globals";
import { FaBars, FaTimes, FaCogs, FaUpload, FaBook, FaHeart, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaEllipsisV } from "react-icons/fa";

export const navData = {
  logoLink: "/",
  hamburgerMenuIcons: { open: <FaBars />, close: <FaTimes /> },
  browseButton: { label: "Browse Books", icon: null, href: "/browse" },
  menuButton:{label: "Menu", icon: <FaEllipsisV/>},
  noUserItems: [
    { label: "Sign In", icon: <FaSignInAlt/>, href: "/auth/sign-in" },
    { label: "Sign Up", icon: <FaUserPlus />, href: "/auth/sign-up" },
  ],
  userDropdownItems: [
    { label: "My Books", icon: <FaBook />, href: "/my-books" },
    { label: "Favorites", icon: <FaHeart />, href: "/favorites" },
    { label: "Upload", icon: <FaUpload />, href: "/upload" },
    { label: "Settings", icon: <FaCogs />, href: "/settings" },
    { label: "Logout", icon: <FaSignOutAlt />, logoutAction:true },
  ],
  defaultImg: `${IMAGE_PREFIX}/misc/defaultProfilePic.jpg`,
};



// For the nav bar aniamitons 
export const slideVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};