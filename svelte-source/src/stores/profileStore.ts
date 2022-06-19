import { writable } from 'svelte/store'
import { profileLocalStorageName } from '../types/types';
import type { optionalHudIconType, playerHudIcons } from '../types/types';
import { get } from 'svelte/store';
import ColorEffectStore, { colorEffectStoreType } from '../stores/colorEffectStore';
import PlayerHudStore from '../stores/playerStatusHudStore';
import LayoutStore, { playerStatusLayoutType } from '../stores/layoutStore';

interface profileType {
  name: string
  editingName: boolean
  savedData: string
}

interface savedDataObject {
  playerStatusIconData: {
    icons: playerHudIcons
    globalIconSettings: optionalHudIconType
    showingOrder: Array<keyof playerHudIcons>
  }
  colorData: colorEffectStoreType
  layoutData: playerStatusLayoutType
}

type profileStoreType = Array<profileType>;

const store = () => {
  let stored: string = localStorage.getItem(profileLocalStorageName);
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

  function getDefaultSettings(): profileStoreType {
    return getLocalStorage("profiles", []);
  }

  const playerStatusLayoutState: profileStoreType = getDefaultSettings();

  const { subscribe, set, update } = writable(playerStatusLayoutState);

  const methods = {
    addNewProfile(profileName: string) {
      update(state => {
        let length: number = state.length+1;
        let newProfileName: string = profileName+"#"+length;
        state = [...state, {name: newProfileName, editingName: false, savedData: ""}];
        return state;
      });
    },
    applyProfileToHud(index: number) {
      update(state => {
        // User could create a profile without saving hud to profile before clicking apply profile to hud
        if (state[index] && state[index].savedData) {
          let saveStateObject: savedDataObject = JSON.parse(state[index].savedData);
          PlayerHudStore.receiveProfileData(saveStateObject.playerStatusIconData);
          ColorEffectStore.receiveUIUpdateMessage(saveStateObject.colorData.icons, saveStateObject.playerStatusIconData.icons);
          LayoutStore.receiveUIUpdateMessage(saveStateObject.layoutData as any);
        }
        return state;
      });
    },
    deleteProfile(deleteIndex: number) {
      update(state => {
        state = [...state.slice(0, deleteIndex), ...state.slice(deleteIndex + 1)]
        return state;
      });
    },
    saveHUDToProfile(index: number) {
      const playerStatusIconData = PlayerHudStore.getSaveableData();
      const colorData = get(ColorEffectStore);
      const layoutData = get(LayoutStore);
      let saveState: savedDataObject = { playerStatusIconData, colorData, layoutData}
      update(state => {
        state[index].savedData = JSON.stringify(saveState);
        return state;
      });
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