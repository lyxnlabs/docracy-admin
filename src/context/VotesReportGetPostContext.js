import React, { createContext, useState, useContext } from "react";

// Create the context
const VotesReportGetPostContext = createContext();

// Create a component that acts as the provider
export const useVotesReportGetPostContext = () => {
  return useContext(VotesReportGetPostContext);
};
// eslint-disable-next-line react/prop-types
export const VotesReportGetPostProvider = ({ children }) => {
  const [selectedPostID, setSelectedPostID] = useState(2);

  const updateSelectedID = (newSelectedPostID) => {
    setSelectedPostID(newSelectedPostID);
  };

  return (
    <VotesReportGetPostContext.Provider value={[selectedPostID, setSelectedPostID]}>
      {children}
    </VotesReportGetPostContext.Provider>
  );
};
