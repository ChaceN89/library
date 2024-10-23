// src/components/navUI/NavBar.jsx
import React from 'react';
import FixedNavItems from './FixedNavItems';
import UserActionsNav from './UserActionsNav';

const NavBar = () => (
  <nav className="w-full bg-red-900 p-4">
    <div className="flex justify-between container mx-auto">
      <FixedNavItems />
      <UserActionsNav />
    </div>
  </nav>
);

export default NavBar;
