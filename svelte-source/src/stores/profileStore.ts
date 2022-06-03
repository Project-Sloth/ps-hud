import { writable } from 'svelte/store'
import { profileLocalStorageName } from '../types/types';
import { get } from 'svelte/store';
import ColorEffectStore, { colorEffectStoreType } from '../stores/colorEffectStore';
import PlayerHudStore, { playerStatusType } from '../stores/playerStatusHudStore';
import LayoutStore, { playerStatusLayoutType } from '../stores/layoutStore';

interface profileType {
  name: string
  editingName: boolean
  savedData: string
}

interface savedDataObject {
  playerStatusIconData: playerStatusType
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
    addNewProfile() {
      update(state => {
        let length: number = state.length+1;
        let newProfileName: string = "Profile#"+length;
        state = [...state, {name: newProfileName, editingName: false, savedData: ""}];
        return state;
      });
    },
    applyProfileToHud(index: number) {
      update(state => {
        // User could create a profile without saving hud to profile before apply
        if (state[index] && state[index].savedData) {
          let saveStateObject: savedDataObject = JSON.parse(state[index].savedData);
          PlayerHudStore.receiveProfileData(saveStateObject.playerStatusIconData);
          ColorEffectStore.receiveUIUpdateMessage(saveStateObject.colorData.icons);
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
      const playerStatusIconData = get(PlayerHudStore);
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