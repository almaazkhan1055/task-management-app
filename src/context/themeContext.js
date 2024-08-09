"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const Theme = ({ children }) => {
  const [dark, setDark] = useState(false);

  const handleTheme = () => {
    setDark(!dark);
  };

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        handleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Theme;
