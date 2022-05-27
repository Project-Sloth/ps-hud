import { writable } from 'svelte/store'
import type { layoutIconKind } from '../types/types';
import { layoutStoreLocalStorageName } from '../types/types';

type playerStatusLayoutType = {
  layout: layoutIconKind
  iconBetweenSpacing: number,
  yAxisSpacing: number,
  xAxisSpacing: number,
}

const store = () => {
  let stored = localStorage.getItem(layoutStoreLocalStorageName);
  if (stored) {
    stored = JSON.parse(stored);
  }

  function getLocalStorage(key: string, fallback: any) {
    if (stored && stored[key] != null) {
      return stored[key];
    }
    return fallback;
  }

  function getDefaultSettings(): playerStatusLayoutType {
    return {
      layout: getLocalStorage("layout", "standard"),
      iconBetweenSpacing: getLocalStorage("iconBetweenSpacing", 2),
      xAxisSpacing: getLocalStorage("xAxisSpacing", 0),
      yAxisSpacing: getLocalStorage("yAxisSpacing", 0),
    };
  }

  const playerStatusLayoutState: playerStatusLayoutType = getDefaultSettings();

  const { subscribe, set, update } = writable(playerStatusLayoutState);

  const methods = {
    resetLayout() {
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
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store();