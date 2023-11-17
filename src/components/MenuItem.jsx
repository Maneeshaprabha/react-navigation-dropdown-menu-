import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown'; // Assuming you have a Dropdown component

const MenuItem = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const [isClickingButton, setIsClickingButton] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
        setIsClickingButton(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
    setIsClickingButton(true); // Set clicking state to true

    // Close dropdown after 0.5 seconds if button is held down
    const timeout = setTimeout(() => {
      if (isClickingButton) {
        setDropdown(false);
        setIsClickingButton(false);
      }
    }, 500);

    // Clear timeout on mouseup or touchend
    const clearTimeoutHandler = () => {
      clearTimeout(timeout);
      setIsClickingButton(false);
    };

    document.addEventListener('mouseup', clearTimeoutHandler);
    document.addEventListener('touchend', clearTimeoutHandler);

    return () => {
      document.removeEventListener('mouseup', clearTimeoutHandler);
      document.removeEventListener('touchend', clearTimeoutHandler);
    };
  };

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={toggleDropdown}
            onBlur={() => {
              // Close dropdown if focus leaves the button
              if (isClickingButton) {
                setDropdown(false);
                setIsClickingButton(false);
              }
            }}
          >
            {items.title} {depthLevel > 0 ? <span className="arrow" /> : <span className="arrow" />}
          </button>
          {dropdown && <Dropdown submens={items.submenu} dropdown={dropdown} depthlevel={depthLevel} />}
        </>
      ) : (
        <a href="/#">{items.title}</a>
      )}
    </li>
  );
};

export default MenuItem;
