import {StateStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({
  id: 'numbers-storage',
  encryptionKey:
    'JoaLHZA36ALgCpB97U+YWO0YdAXnij7pbhiVbrd1TVkrrguoBcAgiiV7BCV6JjirWIc0MFDpJnU',
});

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

export default zustandStorage;
