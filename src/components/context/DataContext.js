import React, { createContext, useContext, useEffect, useState } from "react";
import { TrackerData, updateTrackerData } from "components/features/Tracker";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setDataState] = useState(TrackerData);

  const setData = (newData) => {
    const newTrackerData = updateTrackerData(data, newData);
    setDataState({ ...newTrackerData });
  };

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
