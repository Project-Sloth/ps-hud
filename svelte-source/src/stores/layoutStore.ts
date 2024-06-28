import { writable } from 'svelte/store'
import type { layoutIconKind } from '../types/types';
import { layoutStoreLocalStorageName } from '../types/types';

export type playerStatusLayoutType = {
  layout: layoutIconKind
  iconBetweenSpacing: number,
  yAxisSpacing: number,
  xAxisSpacing: number,
}

const store = () => {
  let stored: string = localStorage.getItem(layoutStoreLocalStorageName);
  let storedObject: object = {};
  if (stored) {
    storedObject = JSON.parse(stored);
  }

  function getLocalStorage(key: string, fallback: any) {
    if (storedObject && storedObject[key] != null) {
      return storedObject[key];
    }
    return fallback;
  }

  function getDefaultSettings(): playerStatusLayoutType {
    return {
      layout: getLocalStorage("layout", "standard"),
      iconBetweenSpacing: getLocalStorage("iconBetweenSpacing", 10),
      xAxisSpacing: getLocalStorage("xAxisSpacing", 20),
      yAxisSpacing: getLocalStorage("yAxisSpacing", 2),
    };
  }

  const playerStatusLayoutState: playerStatusLayoutType = getDefaultSettings();

  const { subscribe, set, update } = writable(playerStatusLayoutState);

  const methods = {
    resetLayout() {
      storedObject = {};
      localStorage.removeItem(layoutStoreLocalStorageName);
      set(getDefaultSettings());
    },
    receiveUIUpdateMessage(data: playerStatusLayoutType) {
      update(state => {
        state.layout = data.layout;
        state.iconBetweenSpacing = data.iconBetweenSpacing;
        state.xAxisSpacing = data.xAxisSpacing;
        state.yAxisSpacing = data.yAxisSpacing;
        return state;
      });
    },
    updateLayout(layout: layoutIconKind) {
      update(state => {
        state.layout = layout;
        return state;
      })
    },
    updateLayoutSettings(layout: layoutIconKind, xAxisSpacing: number, yAxisSpacing: number, iconBetwweenSpacing: number) {
      update(state => {
        state.layout = layout;
        state.xAxisSpacing = xAxisSpacing;
        state.yAxisSpacing = yAxisSpacing;
        state.iconBetweenSpacing = iconBetwweenSpacing;
        return state;
      })
    }
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store();
