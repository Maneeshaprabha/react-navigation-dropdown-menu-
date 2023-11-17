
// Dropdown.js
import React from 'react';
import MenuItem from './MenuItem';

const Dropdown = ({ submens, depthlevel }) => {
  depthlevel = depthlevel + 1;
  const dropdownClass = depthlevel > 1 ? 'dropdown-submenu' : '';

  return (
    <div>
      <ul className={`dropdown-submenu ${dropdownClass}`}>
        {submens.map((submenu, index) => (
          <MenuItem items={submenu} key={index} depthLevel={depthlevel} />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;