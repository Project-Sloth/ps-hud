import { writable } from 'svelte/store'
import { fetchNui } from '../utils/eventHandler';
import DebugStore from './debugStore';

type menuStatus = {
  show: boolean,
}

const store = () => {

  const menuStatusState: menuStatus = {
    show: false || DebugStore,
  }

  const { subscribe, set, update } = writable(menuStatusState);

  const methods = {
    closeMenu() {
      update(state => {
        state.show = false;
        return state;
      });
      fetchNui('closeMenu');
    },
    handleKeyUp(data) {
      if (data.key == "Escape") {
        console.log("Got Escape key going to close menu!!!");
        methods.closeMenu()
      }
    },
    receiveMessage() {
      methods.openMenu();
    },
    openMenu() {
      update(state => {
        state.show = true;
        return state;
      });
    }
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  };
}

export default store();

