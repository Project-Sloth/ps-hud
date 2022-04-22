import { writable } from 'svelte/store'
import type { layoutIconKind } from '../types/types';

type playerStatusLayoutType = {
  layout: layoutIconKind
  iconBetweenSpacing: number,
  yAxisSpacing: number,
  xAxisSpacing: number,
}

const store = () => {

  const playerStatusLayoutState: playerStatusLayoutType = {
    layout: "standard",
    iconBetweenSpacing: 2,
    xAxisSpacing: 0,
    yAxisSpacing: 0,
  };

  const { subscribe, set, update } = writable(playerStatusLayoutState);

  const methods = {
    receiveUIUpdateMessage(data) {
      update(state => {
        state.layout = data.layout;
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