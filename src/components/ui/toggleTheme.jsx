"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const ToggleTheme = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
};

export default ToggleTheme;
