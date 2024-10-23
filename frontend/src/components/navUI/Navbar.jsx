// src/components/navUI/NavBar.jsx
import React from 'react';
import FixedNavItems from './FixedNavItems';
import UserActionsNav from './UserActionsNav';

const NavBar = () => (
  <nav className="w-full bg-red-900 p-4 sticky top-0 z-50 shadow-lg">  {/* Added sticky, top, and z-index */}
    <div className="flex justify-between container mx-auto">
      <FixedNavItems />
      <UserActionsNav />
    </div>
  </nav>
);

export default NavBar;
