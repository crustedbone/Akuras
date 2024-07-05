import React, { createContext, useState } from 'react';

export const ClusterContext = createContext();

export const ClusterProvider = ({ children }) => {
  const [clusters, setClusters] = useState(null);
  return (
    <ClusterContext.Provider value={{ clusters, setClusters }}>
      {children}
    </ClusterContext.Provider>
  );
};
