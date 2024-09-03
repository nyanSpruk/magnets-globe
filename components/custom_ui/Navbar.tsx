// components/custom_ui/Navbar.tsx

import React from "react";
import { Button } from "../ui/button";

interface NavbarProps {
  onHomeClick: () => void; // Add a prop for handling the click
  onAboutClick: () => void; // Add a prop for handling the click
}

export const Navbar: React.FC<NavbarProps> = ({
  onHomeClick,
  onAboutClick,
}) => {
  return (
    <div className="absolute flex justify-between items-center top-0 left-0 py-4 px-8 bg-transparent text-white z-10">
      <div className="flex items-center space-x-2">
        <Button className="bg-transparent" onClick={onHomeClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 1a7 7 0 100 14 7 7 0 000-14zm0 1a6 6 0 100 12 6 6 0 000-12zm0 1a5 5 0 100 10 5 5 0 000-10zm0 1a4 4 0 100 8 4 4 0 000-8zm0 1a3 3 0 100 6 3 3 0 000-6zm0 1a2 2 0 100 4 2 2 0 000-4zm0 1a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button onClick={onAboutClick} className="bg-transparent">
          About the project
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
