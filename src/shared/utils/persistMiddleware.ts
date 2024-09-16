import {
  PersistOptions,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';
import zustandStorage from './storage';
import {StateCreator} from 'zustand';

const persistMiddleware = <T>(
  f: StateCreator<T, [], []>,
  name: string,
  options?: PersistOptions<T, unknown>,
) =>
  devtools(
    persist(f, {
      ...options,
      name,
      storage: createJSONStorage(() => zustandStorage),
    }),
  );

export default persistMiddleware;
