import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loadTrackerData,
  resetTrackerData,
  TrackerData,
  updateTrackerData,
} from "components/features/Tracker";
import {
  getTrackerData,
  openDatabase,
  storeData,
} from "components/features/Storage";

const DataContext = createContext();

const DatabaseName = "TCG-Pocket-Simulator-Tracker";
const DatabaseStorage = "TCG-Pocket-Simulator-Storage";

let pendingData = {};

const scheduleBatchWrite = (key, value) => {
  pendingData[key] = value;
  debouncedWriteBatch();
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const debouncedWriteBatch = debounce(async () => {
  if (Object.keys(pendingData).length === 0) return;

  const db = await openDatabase(DatabaseName, DatabaseStorage);
  await storeData(db, DatabaseStorage, pendingData);
  pendingData = {};
}, 500);

export const DataProvider = ({ children }) => {
  const [data, setDataState] = useState(TrackerData);

  useEffect(() => {
    let db;

    const initializeDB = async () => {
      try {
        db = await openDatabase(DatabaseName, DatabaseStorage);
        const allData = await getTrackerData(db, DatabaseStorage);
        if (allData.length > 0) {
          loadTrackerData(data, allData);
        }
      } catch (error) {
        console.error("Error initializing IndexedDB:", error);
      }
    };

    initializeDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  const setData = (newData) => {
    const newTrackerData = updateTrackerData(data, newData);
    if (!Number.isInteger(newData)) {
      let { id, tier, packType, counter } = newData;
      scheduleBatchWrite(id, { tier, packType, counter });
    }
    setDataState({ ...newTrackerData });
  };

  const resetData = () => {
    resetTrackerData(DatabaseName, DatabaseStorage);
    setDataState(TrackerData);
  };

  return (
    <DataContext.Provider value={{ data, setData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
