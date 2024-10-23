import React, { useState, useRef, useEffect } from 'react';

const NavDropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);  // Ref for the button
  const dropRef = useRef(null); // Ref for the dropdown

  // The boundary value to check if the mouse is out of the reference element
  const boundaryValue = 100;  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Check if the mouse is out of the boundary area from the reference element
  const isMouseOutOfBounds = (rect, mouseX, mouseY) => {
    return (
      mouseX < rect.left - boundaryValue || 
      mouseX > rect.right + boundaryValue || 
      mouseY < rect.top - boundaryValue || 
      mouseY > rect.bottom + boundaryValue
    );
  };

  // Handle mouse leave event to close the dropdown if the mouse is far enough out of the elemetns reference
  const handleMouseLeave = (event) => {
    const btnRect = btnRef.current?.getBoundingClientRect();
    const dropRect = dropRef.current?.getBoundingClientRect();
    const { clientX: mouseX, clientY: mouseY } = event;

    if (isMouseOutOfBounds(btnRect, mouseX, mouseY) && isMouseOutOfBounds(dropRect, mouseX, mouseY)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseLeave);
    } else {
      document.removeEventListener('mousemove', handleMouseLeave);
    }
    return () => document.removeEventListener('mousemove', handleMouseLeave);
  }, [isOpen]);

  return (
    <div className="relative">
      <button ref={btnRef} onClick={toggleDropdown} className="border p-2 rounded-lg">
        Menu
      </button>
      {isOpen && (
        <div ref={dropRef} className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 w-48">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={item.action ? item.action : null}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
