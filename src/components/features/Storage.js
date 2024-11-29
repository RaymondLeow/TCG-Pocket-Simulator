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

export const getData = (db, storeName, key = null) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    if (key) {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    } else {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    }
  });
};
