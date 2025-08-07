// src/components/NavBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import ProfileDropdown from './ProfileDropDown';

const Navbar = ({ toggleTheme, isLoggedIn, currentUser, onLogout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setDropdownOpen(prev => !prev);
    } else {
      navigate('/login');
    }
  };

  // Your backend sends `profile_image_url`, but let's check for it safely
  const profileImage = currentUser?.profile_image_url || '/assets/profile.jpg';

  return (
    <nav className="navbar">
      <div className="navbar-brand">PriceWise</div>
      <div className="navbar-right">
        <ThemeToggler toggleTheme={toggleTheme} />
        <div className="profile-section">
          <img
            src={profileImage}
            alt="User Profile"
            className="profile-img"
            onClick={handleProfileClick}
          />
          {isLoggedIn && isDropdownOpen && (
            <ProfileDropdown user={currentUser} onLogout={() => {
              onLogout();
              setDropdownOpen(false);
            }} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;