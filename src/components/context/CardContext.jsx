/** @format */

import React from "react";

export const CardDataContext = React.createContext();

function CardContext({ children }) {
  const API_URL = "https://6516660f09e3260018c9b5e8.mockapi.io/Cards";

  return (
    <CardDataContext.Provider value={{ API_URL }}>
      {children}
    </CardDataContext.Provider>
  );
}

export default CardContext;
