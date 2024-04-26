export const getFromStorage = (name: string) => {
  const itemsFromStorage = localStorage.getItem(name);
  return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
};

export const addToStorageList = (
  listName: string,
  newItemData: any,
  reload?: boolean
) => {
  const storageList = getFromStorage(listName);

  storageList.push(newItemData);

  localStorage.setItem(listName, JSON.stringify(storageList));

  if (reload) {
    window.location.reload();
  }
};

export const changeDayInStorageList = (
  listName: string,
  newItemData: any,
  reload?: boolean
) => {
  const storageList = getFromStorage(listName);

  const updatedList = storageList.map((pickedDay: any) => {
    if (pickedDay.day === newItemData.day) {
      return {
        ...newItemData,
      };
    }

    return pickedDay;
  });

  localStorage.setItem(listName, JSON.stringify(updatedList));

  if (reload) {
    window.location.reload();
  }
};

export const removeFromStorageList = (
  listName: string,
  itemData: any,
  reload?: boolean
) => {
  const storageList = getFromStorage(listName);

  const updatedList = storageList.filter(
    (pickedDay: any) => pickedDay.day !== itemData.day
  );

  localStorage.setItem(listName, JSON.stringify(updatedList));

  if (reload) {
    window.location.reload();
  }
};

export const removeStorageList = (listName: string, reload?: boolean) => {
  localStorage.removeItem(listName);

  if (reload) {
    window.location.reload();
  }
};
