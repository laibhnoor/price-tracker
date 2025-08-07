// src/components/ProfileDropdown.jsx
import React from 'react';

const ProfileDropDown = ({ user, onLogout }) => {
  return (
    <div className="profile-dropdown">
      <div className="dropdown-user-info">
        <strong>{user.full_name}</strong>
        <span>{user.email}</span>
      </div>
      <button onClick={onLogout} className="dropdown-logout-btn">
        Log Out
      </button>
    </div>
  );
};

export default ProfileDropDown;