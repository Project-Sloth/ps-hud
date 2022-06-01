import { writable } from 'svelte/store'
import { fetchNui } from '../utils/eventHandler';
import DebugStore from './debugStore';
import { menuStoreLocalStorageName } from '../types/types';
import { saveUIDataToLocalStorage } from '../utils/eventHandler';
import PlayerHudStore from '../stores/playerStatusHudStore';

type menuStatus = {
  show: boolean,
  isRestarting: boolean,
  adminOnly: boolean,
  isAdmin: boolean,
  isCineamticModeChecked: boolean,
  isCinematicNotifyChecked: boolean,
  isCompassFollowChecked: boolean,
  isMapEnabledChecked: boolean,
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
  isToggleMapBordersChecked: boolean, 
  isToggleMapShapeChecked: "circle" | "square"
}

const store = () => {
  let stored: string = localStorage.getItem(menuStoreLocalStorageName);
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

  function getDefaultSettings(): menuStatus {
    return {
      show: false || DebugStore,
      isRestarting: false,
      adminOnly: false || DebugStore,
      isAdmin: false || DebugStore,
      isCineamticModeChecked: getLocalStorage("isCineamticModeChecked", false),
      isCinematicNotifyChecked: getLocalStorage("isCinematicNotifChecked", true),
      isCompassFollowChecked: getLocalStorage("isCompassFollowChecked", true),
      isMapEnabledChecked: getLocalStorage("isHideMapChecked", true),
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
      storedObject = {};
      localStorage.removeItem(menuStoreLocalStorageName);
      update(state => {
        let newState: menuStatus = { 
          ...getDefaultSettings(),
          show: true,
          adminOnly: state.adminOnly,
          isAdmin: state.isAdmin
        };
        state = newState;
        return state;
      });
      // Call PlayerStatus Reset Dynamic icon settings to false
      PlayerHudStore.updateAllShowingDynamicIcons(false);

    },
    sendMenuSettingsToClient() {
      update(state => {
        fetchNui("updateMenuSettingsToClient", 
        {
          "isOutMapChecked": state.isOutMapChecked,
          "isOutCompassChecked": state.isOutCompassChecked,
          "isCompassFollowChecked": state.isCompassFollowChecked,
          "isOpenMenuSoundsChecked": state.isOpenMenuSoundsChecked,
          "isResetSoundsChecked": state.isResetSoundsChecked,
          "isListSoundsChecked": state.isListSoundsChecked,
          "isMapNotifyChecked": state.isMapNotifyChecked,
          "isLowFuelAlertChecked": state.isLowFuelAlertChecked,
          "isCinematicNotifyChecked": state.isCinematicNotifyChecked,
          "isToggleMapShapeChecked": state.isToggleMapShapeChecked,
          "isMapEnabledChecked": state.isMapEnabledChecked,
          "isToggleMapBordersChecked": state.isToggleMapBordersChecked,
          "isShowCompassChecked": state.isShowCompassChecked,
          "isShowStreetsChecked": state.isShowStreetsChecked,
          "isPointerShowChecked": state.isPointerShowChecked,
          "isCineamticModeChecked": state.isCineamticModeChecked,
        });
        return state;
      })
    }
  };

  // Upon loading into server send the client the menu settings data
  //  to be in sync with the ui settings
  methods.sendMenuSettingsToClient();

  return {
    subscribe,
    set,
    update,
    ...methods
  };
}

export default store();

