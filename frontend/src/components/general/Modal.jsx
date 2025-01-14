/**
 * @file Modal.jsx
 * @module Modal
 * @description 
 *   A reusable modal component that displays content in a centered overlay. 
 *   Includes functionality to close the modal via an overlay click, the "Escape" key, 
 *   or a close button. Designed for accessibility and responsiveness.
 *
 * @requires React
 * @requires react-icons/fa - Icon library for the close button.
 *
 * @component Modal
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {Function} props.onClose - A callback function to handle closing the modal.
 *
 * @example
 * // Usage example:
 * import Modal from '@/components/general/Modal';
 * 
 * function App() {
 *   const [showModal, setShowModal] = useState(false);
 * 
 *   return (
 *     <div>
 *       <button onClick={() => setShowModal(true)}>Open Modal</button>
 *       {showModal && (
 *         <Modal onClose={() => setShowModal(false)}>
 *           <h2>Modal Content</h2>
 *           <p>This is the content inside the modal.</p>
 *         </Modal>
 *       )}
 *     </div>
 *   );
 * }
 *
 * @exports Modal
 * 
 * @author Chace Nielson
 * @created 2025-01-14
 * @updated 2025-01-14
 */

import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * Renders a modal with an overlay and close options.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content to display inside the modal.
 * @param {Function} props.onClose - Function to handle closing the modal.
 * @returns {JSX.Element} A modal component.
 */
function Modal({ children, onClose }) {
  useEffect(() => {
    // Function to handle the Escape key press
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener when the component is mounted
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 border-2 dark:border-white border-black rounded-lg p-6 shadow-lg max-w-lg w-full relative">
          <button
            className="absolute top-2 right-2 text-secondary dark:text-primary hover:text-accent dark:hover:text-accent"
            onClick={onClose}
          >
            <FaTimes size={22} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
