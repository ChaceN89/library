// src/components/navUI/NavDropdown.jsx
import React from 'react';

const NavDropdown = ({ items }) => (
  <div className="relative">
    <button className="border p-2 rounded-lg">Menu</button>
    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 w-48">
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
  </div>
);

export default NavDropdown;
