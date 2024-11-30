export const openDatabase = (dbName, storeName, version = 1) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
};

export const storeData = (db, storeName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    for (const [key, value] of Object.entries(data)) {
      store.put(value, key);
    }

    transaction.oncomplete = function () {
      resolve("All data stored successfully!");
    };

    transaction.onerror = function (event) {
      reject(event.target.error);
    };
  });
};

export const getTrackerData = (db, storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    const valuesRequest = store.getAll();
    const keysRequest = store.getAllKeys();

    valuesRequest.onsuccess = function () {
      keysRequest.onsuccess = function () {
        const dataWithKeys = valuesRequest.result.map((value, index) => ({
          id: keysRequest.result[index],
          ...value,
        }));

        resolve(dataWithKeys);
      };
    };
    valuesRequest.onerror = (event) => reject(event.target.error);
  });
};

export const deleteData = (db, storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.clear();
    request.onsuccess = () => resolve("All data cleared successfully!");
    request.onerror = (event) => reject(event.target.error);
  });
};
