import { Writable, writable } from "svelte/store";


export interface DefaultStoreType<T> extends Writable<T>{
  resetValue: () => void,
}

export function FunctionDefaultStore<T>(value: () => T): DefaultStoreType<T> {
  const defaultValue: T = value();
  const { subscribe, set, update } = writable(defaultValue);

  const methods = {
    resetValue() {
      set(value());
    }
  };

  return {
    subscribe,
    set,
    update,
    ...methods,
  }
}

export function DefaultStore<T>(value: T): DefaultStoreType<T> {
  const defaultValue: T = value;
  const { subscribe, set, update } = writable(defaultValue);

  const methods = {
    resetValue() {
      set(value);
    }
  };

  return {
    subscribe,
    set,
    update,
    ...methods,
  }
}

