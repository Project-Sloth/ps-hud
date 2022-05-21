import { writable } from 'svelte/store'
import { fetchNui } from '../utils/eventHandler';
import DebugStore from './debugStore';

type menuStatus = {
  show: boolean,
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

const MenuLocalStorageStore = () => {
  const storageName: string = "hudMenuLocalStorage";
  let stored = localStorage.getItem(storageName);
  if (stored) stored = JSON.parse(stored);

  function getLocalStorage(key: string, fallback: any) {
    if (stored && stored[key] != null) {
      return stored[key];
    }
    return fallback;
  }

  const menuStatusState: menuStatus = {
    show: false || DebugStore,
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

  const { subscribe, set, update } = writable(menuStatusState);

  subscribe((val) => {
    localStorage.setItem(storageName, JSON.stringify(val));
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
        methods.closeMenu()
      }
    },
    receiveMessage() {
      methods.openMenu();
    },
    receiveAdminMessage(data: { isAdmin: boolean }) {
      update(state => {
        state.isAdmin = data.isAdmin;
        return state;
      });
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

export default MenuLocalStorageStore();

