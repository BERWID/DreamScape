import { Dream } from '../types';

const STORAGE_KEY = 'dreamscape_data_v1';

export const getDreams = (): Dream[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading dreams:', error);
    return [];
  }
};

export const saveDream = (dream: Dream): void => {
  const dreams = getDreams();
  const existingIndex = dreams.findIndex(d => d.id === dream.id);
  
  if (existingIndex >= 0) {
    dreams[existingIndex] = dream;
  } else {
    dreams.unshift(dream);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
};

export const deleteDream = (id: string): void => {
  const dreams = getDreams();
  const filtered = dreams.filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};