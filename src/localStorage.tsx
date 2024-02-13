// Сохранение данных в LocalStorage
export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Получение данных из LocalStorage
export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Очистка данных в LocalStorage
export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
