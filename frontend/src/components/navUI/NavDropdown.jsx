import React, { useState, useRef, useEffect } from 'react';
import NavButton from './NavButton';
import { navData } from '@/data/navData';

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
      <button ref={btnRef} onClick={toggleDropdown} className="nav-button-1 flex gap-0.5 items-center">
        <span className="relative z-10 flex gap-1 items-center">{navData.menuButton.icon}{navData.menuButton.label}</span>
      </button>
      {isOpen && (
        <div ref={dropRef} className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 w-fit">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={item.action ? item.action : null}
            >
              <div className='flex gap-2 items-center whitespace-nowrap'>
                {item.icon}  
                {item.label}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
