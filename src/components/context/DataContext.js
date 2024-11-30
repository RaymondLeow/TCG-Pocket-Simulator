import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loadMiscellaneousData,
  loadTrackerData,
  resetTrackerData,
  TrackerData,
  updateTrackerData,
} from "components/features/Tracker";
import {
  closeAndDeleteDatabase,
  getData,
  getTrackerData,
  openDatabase,
  storeData,
} from "components/features/Storage";

const DataContext = createContext();

const DatabaseName = "TCG-Pocket-Simulator-Tracker";
const DatabaseStorage = "TCG-Pocket-Simulator-Storage";
const DatabaseMiscellaneous = "TCG-Pocket-Simulator-Miscellaneous";

let pendingData = {
  [DatabaseStorage]: {},
  [DatabaseMiscellaneous]: {},
};

const scheduleBatchWrite = (key, value, storeName) => {
  pendingData[storeName][key] = value;
  debouncedWriteBatch(storeName);
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const debouncedWriteBatch = debounce(async (storeName) => {
  if (Object.keys(pendingData[storeName]).length === 0) return;

  const db = await openDatabase(DatabaseName, storeName);
  await storeData(db, storeName, pendingData[storeName]);
  pendingData[storeName] = {};
}, 500);

export const DataProvider = ({ children }) => {
  const [data, setDataState] = useState({ ...TrackerData });

  useEffect(() => {
    let db;

    const initializeDB = async () => {
      try {
        db = await openDatabase(DatabaseName, [
          DatabaseStorage,
          DatabaseMiscellaneous,
        ]);

        const allData = await getTrackerData(db, DatabaseStorage);
        if (allData.length > 0) {
          loadTrackerData(data, allData);
        }

        const miscData = await getData(
          db,
          DatabaseMiscellaneous,
          "packsOpened"
        );
        if (miscData) {
          loadMiscellaneousData(data, miscData);
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
    if (Number.isInteger(newData)) {
      scheduleBatchWrite(
        "packsOpened",
        newTrackerData.packsOpened,
        DatabaseMiscellaneous
      );
    } else {
      let { id, tier, packType, counter } = newData;
      scheduleBatchWrite(id, { tier, packType, counter }, DatabaseStorage);
    }
    setDataState({ ...newTrackerData });
  };

  const resetData = async () => {
    resetTrackerData(DatabaseName, DatabaseStorage);
    resetTrackerData(DatabaseName, DatabaseMiscellaneous);
    closeAndDeleteDatabase(DatabaseName);
    setDataState({ ...TrackerData });
  };

  return (
    <DataContext.Provider value={{ data, setData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
