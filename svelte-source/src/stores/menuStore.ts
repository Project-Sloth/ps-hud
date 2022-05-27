import { writable } from 'svelte/store'
import { fetchNui } from '../utils/eventHandler';
import DebugStore from './debugStore';
import { menuStoreLocalStorageName } from '../types/types';
import { saveUIDataToLocalStorage } from '../utils/eventHandler';

type menuStatus = {
  show: boolean,
  isRestarting: boolean,
  adminOnly: boolean,
  isAdmin: boolean,
  isChangeCompassFPSChecked: "optimized" | "synced",
  isChangeFPSChecked: "optimized" | "synced",
  isCineamticModeChecked: boolean,
  isCinematicNotifyChecked: boolean,
  isCompassFollowChecked: boolean,
  isDegreesShowChecked: boolean,
  isHideMapChecked: boolean,
  isListSoundsChecked: boolean,
  isLowFuelAlertChecked: boolean,
  isMapNotifyChecked: boolean,
  isOpenMenuSoundsChecked: boolean,
  isOutCompassChecked: boolean,
  isOutMapChecked: boolean,
  isPointerShowChecked: boolean,
  isResetSoundsChecked: boolean,
  isShowCompassChecked: boolean,
  isShowStreetsChecked: boolean,
  isStaticArmorChecked: boolean,
  isStaticEngineChecked: boolean,
  isStaticHealthChecked: boolean,
  isStaticHungerChecked: boolean,
  isStaticNitroChecked: boolean,
  isStaticOxygenChecked: boolean,
  isStaticStressChecked: boolean,
  isStaticThirstChecked: boolean,
  isToggleMapBordersChecked: boolean, 
  isToggleMapShapeChecked: "circle" | "square"
}

const store = () => {
  let stored = localStorage.getItem(menuStoreLocalStorageName);
  if (stored) {
    stored = JSON.parse(stored);
  }

  function getLocalStorage(key: string, fallback: any) {
    if (stored && stored[key] != null) {
      return stored[key];
    }
    return fallback;
  }

  function getDefaultSettings(): menuStatus {
    return {
      show: false || DebugStore,
      isRestarting: false,
      adminOnly: false || DebugStore,
      isAdmin: false || DebugStore,
      isChangeCompassFPSChecked: getLocalStorage("isChangeCompassFPSChecked", "Optimized"),
      isChangeFPSChecked: getLocalStorage("isChangeFPSChecked", "Optimized"),
      isCineamticModeChecked: getLocalStorage("isCineamticModeChecked", false),
      isCinematicNotifyChecked: getLocalStorage("isCinematicNotifChecked", true),
      isCompassFollowChecked: getLocalStorage("isCompassFollowChecked", true),
      isDegreesShowChecked: getLocalStorage("isDegreesShowChecked", true),
      isHideMapChecked: getLocalStorage("isHideMapChecked", true),
      isListSoundsChecked: getLocalStorage("isListSoundsChecked", true),
      isLowFuelAlertChecked: getLocalStorage("isLowFuelChecked", true),
      isMapNotifyChecked: getLocalStorage("isMapNotifChecked", true),
      isOpenMenuSoundsChecked: getLocalStorage("isOpenMenuSoundsChecked", true),
      isOutCompassChecked: getLocalStorage("isOutCompassChecked", true),
      isOutMapChecked: getLocalStorage("isOutMapChecked", true),
      isPointerShowChecked: getLocalStorage("isPointerShowChecked", true),
      isResetSoundsChecked: getLocalStorage("isResetSoundsChecked", true),
      isShowCompassChecked: getLocalStorage("isShowCompassChecked", true),
      isShowStreetsChecked: getLocalStorage("isShowStreetsChecked", true),
      isStaticArmorChecked: getLocalStorage("isStaticArmorChecked", false),
      isStaticEngineChecked: getLocalStorage("isStaticEngineChecked", false),
      isStaticHealthChecked: getLocalStorage("isStaticHealthChecked", false),
      isStaticHungerChecked: getLocalStorage("isStaticHungerChecked", false),
      isStaticNitroChecked: getLocalStorage("isStaticNitroChecked", false),
      isStaticOxygenChecked: getLocalStorage("isStaticOxygenChecked", false),
      isStaticStressChecked: getLocalStorage("isStaticStressChecked", false),
      isStaticThirstChecked: getLocalStorage("isStaticThirstChecked", false),
      isToggleMapBordersChecked: getLocalStorage("isToggleMapBordersChecked", true), 
      isToggleMapShapeChecked: getLocalStorage("isToggleMapShapeChecked", "circle"),
    }
  }

  const menuStatusState: menuStatus = getDefaultSettings();

  const { subscribe, set, update } = writable(menuStatusState);

  subscribe((val) => {
    let menuSettings = {...val};
    // We dont need to add these to the local storage
    delete menuSettings.show;
    delete menuSettings.isAdmin;
    delete menuSettings.isRestarting;

    localStorage.setItem(menuStoreLocalStorageName, JSON.stringify(menuSettings));
  })

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
        saveUIDataToLocalStorage();
        methods.closeMenu();
      }
    },
    openMenu() {
      update(state => {
        state.show = true;
        return state;
      });
    },
    receiveMessage() {
      methods.openMenu();
    },
    receiveAdminMessage(data: { adminOnly: boolean, isAdmin: boolean }) {
      update(state => {
        state.adminOnly = data.adminOnly;
        state.isAdmin = data.isAdmin;
        return state;
      });
    },
    receiveRestartMessage() {
      update(state => {
        state.isRestarting = false;
        return state;
      })
    },
    resetHudMenuSetting() {
      localStorage.removeItem(menuStoreLocalStorageName);
      set(getDefaultSettings());
    },
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  };
}

export default store();

