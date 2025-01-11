import React, { useState, useRef, useEffect } from 'react';
import { navData } from '@/data/navData';
import Link from 'next/link';

const NavDropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);  // Ref for the button
  const dropRef = useRef(null); // Ref for the dropdown

  const boundaryValue = 100; // The boundary value to check if the mouse is out of the reference element

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isMouseOutOfBounds = (rect, mouseX, mouseY) => {
    return (
      mouseX < rect.left - boundaryValue || 
      mouseX > rect.right + boundaryValue || 
      mouseY < rect.top - boundaryValue || 
      mouseY > rect.bottom + boundaryValue
    );
  };

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
    <div className="relative w-full lg:w-auto">
      <button ref={btnRef} onClick={toggleDropdown} className="nav-button-1 w-full flex gap-.5 items-center">
        <span className="relative z-10 flex gap-1 items-center">{navData.menuButton.icon}{navData.menuButton.label}</span>
      </button>
      {isOpen && (
        <div ref={dropRef} className="absolute right-0 bg-white dark:bg-secondary border rounded-lg shadow-lg w-full lg:w-fit ">
          {items.map((item, index) => (
             <div 
                className={`dropdown-cell 
                  ${index === 0 ? 'rounded-t-lg' : ''} 
                  ${index === items.length - 1 ? 'rounded-b-lg' : ''}`}  
              >
                {item.logoutAction ? (
                  <a
                    onClick={item.action ? item.action : null}
                    className="dropdown-item"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ):(
                  <Link
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )}
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
