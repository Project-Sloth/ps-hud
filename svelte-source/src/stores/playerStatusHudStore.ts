import { derived, get } from 'svelte/store'
import { faHeart, faShieldAlt, faHamburger, faTint, faBrain, faStream,
  faParachuteBox, faMeteor, faLungs, faOilCan, faUserSlash,
  faTachometerAltFast, faTerminal, faHeadset, faMicrophone,
} from '@fortawesome/free-solid-svg-icons'
import type { playerHudIcons, playerHudIconsStore, shapekind, iconNamesKind, optionalHudIconType } from '../types/types';
import { defaultHudIcon, createShapeIcon, capAmountToHundred, playerStoreLocalStorageName, dynamicOptionIconNames } from '../types/types';
import ColorEffectStore from './colorEffectStore';
import {FunctionDefaultStore, DefaultStore} from '../utils/defaultStore';
import type { DefaultStoreType } from '../utils/defaultStore';

type saveUIType = "ready" | "updating";

export type playerStatusType = {
  designMode: DefaultStoreType<boolean>,
  designProgress: DefaultStoreType<number>,
  globalIconSettings: DefaultStoreType<optionalHudIconType>,
  icons: playerHudIconsStore,
  saveUIState: DefaultStoreType<saveUIType>,
  show: DefaultStoreType<boolean>,
  showingOrder: DefaultStoreType<Array<keyof playerHudIcons>>,
}

type playerHudShowMessageType = {
  show: boolean,
}

type playerHudUpdateMessageType = {
  show: boolean,
  health: number,
  playerDead: boolean,
  armor: number,
  thirst: number,
  hunger: number,
  stress: number,
  voice: number,
  radioChannel: number,
  radioTalking: boolean,
  talking: boolean,
  armed: boolean,
  oxygen: number,
  parachute: number,
  nos: number,
  cruise: boolean,
  nitroActive: boolean,
  harness: boolean,
  hp: number,
  speed: number,
  engine: number,
  cinematic: boolean,
  dev: boolean,
}
  
const store = () => {
  let stored: string = localStorage.getItem(playerStoreLocalStorageName);
  let storedObject: object = {};
  if (stored) {
    storedObject = JSON.parse(stored);
  }

  function getLocalStorage<T>(key: iconNamesKind | keyof playerStatusType, fallback: T): T {
    if (storedObject && storedObject[key] != null) {
      return storedObject[key];
    }
    return fallback;
  }

  function getDefaultSettings(): playerStatusType {
    return {
      designMode: DefaultStore(false),
      designProgress: DefaultStore(0),
      globalIconSettings: FunctionDefaultStore(() => getLocalStorage("globalIconSettings",
        (({ isShowing, name, icon, progressValue, ...o }) => o)(defaultHudIcon()))),
      icons: {
        voice: FunctionDefaultStore(() => getLocalStorage("voice", defaultHudIcon("voice", true, faMicrophone, 100))),
        health: FunctionDefaultStore(() => getLocalStorage("health", defaultHudIcon("health", false, faHeart, 100))),
        armor: FunctionDefaultStore(() => getLocalStorage("armor", defaultHudIcon("armor", false, faShieldAlt, 0))),
        hunger: FunctionDefaultStore(() => getLocalStorage("hunger", defaultHudIcon("hunger", false, faHamburger, 100))),
        thirst: FunctionDefaultStore(() => getLocalStorage("thirst", defaultHudIcon("thirst", false, faTint, 100))),
        stress: FunctionDefaultStore(() => getLocalStorage("stress", defaultHudIcon("stress", false, faBrain, 0))),
        oxygen: FunctionDefaultStore(() => getLocalStorage("oxygen", defaultHudIcon("oxygen", false, faLungs, 100))),
        armed: FunctionDefaultStore(() => getLocalStorage("armed", defaultHudIcon("armed", false, faStream, 0))),
        parachute: FunctionDefaultStore(() => getLocalStorage("parachute", defaultHudIcon("parachute", false, faParachuteBox, 0))),
        engine: FunctionDefaultStore(() => getLocalStorage("engine", defaultHudIcon("engine", false, faOilCan, 100))),
        harness: FunctionDefaultStore(() => getLocalStorage("harness", defaultHudIcon("harness", false, faUserSlash, 0))),
        cruise: FunctionDefaultStore(() => getLocalStorage("cruise", defaultHudIcon("cruise", false, faTachometerAltFast, 0))),
        nitro: FunctionDefaultStore(() => getLocalStorage("nitro", defaultHudIcon("nitro", false, faMeteor, 0))),
        dev: FunctionDefaultStore(() => getLocalStorage("dev", defaultHudIcon("dev", false, faTerminal, 0))),
        playerid: FunctionDefaultStore(() => getLocalStorage("playerid", defaultHudIcon("playerid", false, null, 100))),
      },
      saveUIState: DefaultStore("ready"),
      show: DefaultStore(false),
      showingOrder: FunctionDefaultStore(() => getLocalStorage("showingOrder", ["voice", "health", "armor", "hunger", "thirst", "stress", "oxygen", "armed",
        "parachute", "engine", "harness", "cruise", "nitro", "dev", "playerid"])),
    }
  }

  const playerHudUIState: playerStatusType = getDefaultSettings();

  let singleIcons = {};
  for (const [name, icon] of Object.entries(playerHudUIState.icons)) {
    singleIcons[name] = icon;
  }

  const methods = {
    getSaveableData() {
      const saveData: {icons: playerHudIcons, globalIconSettings: optionalHudIconType, showingOrder: Array<keyof playerHudIcons>} =
        { icons: {} as any, globalIconSettings: null, showingOrder: null };
      for (const [name, icon] of Object.entries(playerHudUIState.icons)) {
        saveData.icons[name] = get(icon);
      }
      saveData["globalIconSettings"] = get(playerHudUIState.globalIconSettings);
      saveData["showingOrder"] = get(playerHudUIState.showingOrder);
      return saveData;
    },
    resetPlayerStatusIcons() {
      storedObject = {};
      localStorage.removeItem(playerStoreLocalStorageName);
      playerHudUIState.designMode.resetValue();
      playerHudUIState.designProgress.resetValue();
      playerHudUIState.globalIconSettings.resetValue();
      playerHudUIState.saveUIState.resetValue();
      playerHudUIState.showingOrder.resetValue();
      for (const icon of Object.values(playerHudUIState.icons)) {
        icon.resetValue();
      }
      playerHudUIState.show.set(true);
    },
    saveUIDataToLocalStorage() {
      const data = methods.getSaveableData();
      console.log("Hello!");
      localStorage.setItem(playerStoreLocalStorageName, JSON.stringify({...data.icons, globalIconSettings: data.globalIconSettings, showingOrder: data.showingOrder}));
    },
    updateAllIconsSettings(settingName: keyof optionalHudIconType, value: any) {
      for (let icon of Object.values(playerHudUIState.icons)) {
        icon.update(state => {
          if (settingName in state) {
            state[settingName as any] = value;
          }
          return state;
        });
      }
    },
    updateAllDisplayOutline(show: boolean) {
      methods.updateAllIconsSettings("displayOutline", show);
    },
    updateAllHeight(height: number) {
      methods.updateAllIconsSettings("height", height);
    },
    updateAllIconScale(scale: number) {
      methods.updateAllIconsSettings("iconScaling", scale)
    },
    updateAllRingSize(ringSize: number) {
      methods.updateAllIconsSettings("ringSize", ringSize)
    },
    updateAllRoundXAxis(xAxisCurve: number) {
      methods.updateAllIconsSettings("xAxisRound", xAxisCurve)
    },
    updateAllRoundYAxis(yAxisCurve: number) {
      methods.updateAllIconsSettings("yAxisRound", yAxisCurve)
    },
    updateAllRotateDegree(degree: number) {
      methods.updateAllIconsSettings("rotateDegree", degree)
    },
    updateAllShapes(shape: shapekind) {
      for (let icon in playerHudUIState.icons) {
        playerHudUIState.icons[icon].update(state => {
          let defaultShape = createShapeIcon(shape, 
            {
              icon: state.icon,
              isShowing: state.isShowing,
              name: state.name,
              progressValue: state.progressValue,
            });
          state = defaultShape;
          return state;
        });
      }
      playerHudUIState.globalIconSettings.update(state => {
        state = (({ isShowing, name, icon, progressValue, ...o }) => o)(createShapeIcon(shape,
          {
            icon: state.icon,
            isShowing: state.isShowing,
            name: state.name,
        }));
        return state;
      });
    },
    updateAllTranslateIconX(x: number) {
      methods.updateAllIconsSettings("iconTranslateX", x)
    },
    updateAllTranslateIconY(y: number) {
      methods.updateAllIconsSettings("iconTranslateY", y)
    },
    updateAllTranslateX(x: number) {
      methods.updateAllIconsSettings("translateX", x)
    },
    updateAllTranslateY(y: number) {
      methods.updateAllIconsSettings("translateY", y)
    },
    updateAllWidth(width: number) {
      methods.updateAllIconsSettings("width", width)
    },
    updateIconShape(iconName: iconNamesKind, shape: shapekind) {
      playerHudUIState.icons[iconName].update(state => {
        let defaultShape = createShapeIcon(shape, 
          {
            icon: state.icon,
            isShowing: state.isShowing, 
            name: state.name,
            progressValue: state.progressValue
          });
        state = defaultShape;
        return state;
      });
    },
    updateIconSetting(iconName: iconNamesKind, settingName: keyof optionalHudIconType, value: any) {
      playerHudUIState.icons[iconName].update(state =>{
        state[settingName as any] = value;
        return state;
      });
    },
    updateShowingDynamicIcon(iconName: iconNamesKind, staticShow: boolean) {
      let result: boolean = false;
      switch (iconName) {
        case "armor":
          playerHudUIState.icons.armor.update(state => {
            state.isShowing = methods.staticGenericZeroHandleShow(staticShow, state.progressValue);
            result = state.isShowing;
            return state;
          });
          break;
        case "engine":
          playerHudUIState.icons.engine.update(state => {
            state.isShowing = methods.staticEngineHandleShow(staticShow, state.progressValue);
            result = state.isShowing;
            return state;
          });
          break;
        case "health":
          playerHudUIState.icons.health.update(state => {
            state.isShowing = methods.staticGenericHundredHandleShow(staticShow, state.progressValue);
            result = state.isShowing;
            return state;
          });
          break;
        case "hunger":
          playerHudUIState.icons.hunger.update(state => {
            state.isShowing = methods.staticGenericHundredHandleShow(staticShow, state.progressValue);
            result = state.isShowing;
            return state;
          })
          break;
        case "nitro":
          const engineProgressValue = get(playerHudUIState.icons.engine).progressValue;
          playerHudUIState.icons.nitro.update(state => {
            state.isShowing = methods.staticNitroHandleShow(staticShow, state.progressValue, engineProgressValue);
            result = state.isShowing;
            return state;
          });
          break;
        case "oxygen":
          playerHudUIState.icons.oxygen.update(state => {
            state.isShowing = methods.staticGenericHundredHandleShow(staticShow, state.progressValue);
            result = state.isShowing;
            return state;
          })
          break;
        case "stress":
          playerHudUIState.icons.stress.update(state => {
            state.isShowing = methods.staticGenericZeroHandleShow(staticShow, state.progressValue);
            result = state.isShowing;
            return state;
          })
          break;
        case "thirst":
          playerHudUIState.icons.thirst.update(state => {
            state.isShowing = methods.staticGenericHundredHandleShow(staticShow, state.progressValue);
            result = state.isShowing;
            return state;
          })
          break;
      }
      return result;
    },
    updateAllShowingDynamicIcons(val: boolean) {
      for (const iconName of dynamicOptionIconNames) {
        playerHudUIState.icons[iconName].update(state => {
          state.dynamicShow = val;
          state.isShowing = methods.updateShowingDynamicIcon(iconName, val)
          return state;
        });
      }
    },
    receiveShowMessage(data: playerHudShowMessageType) {
      playerHudUIState.show.set(data.show);
    },
    receiveStatusUpdateMessage(data: playerHudUpdateMessageType) {
      playerHudUIState.show.set(data.show);

      playerHudUIState.icons.voice.update(state => {
        // Should be 1.5, 3, 6 so * 16.6 to show progress
        state.progressValue = capAmountToHundred(data.voice * 16.6);
        if (data.radioChannel && data.radioChannel > 0) {
          state.icon = faHeadset;
        } else {
          state.icon = faMicrophone;
        }
        return state;
      });
      if (data.talking) {
        if (data.radioTalking) {
          ColorEffectStore.updateIconEffectStage("voice", 2);
        } else {
          ColorEffectStore.updateIconEffectStage("voice", 1);
        }
      } else {
        ColorEffectStore.updateIconEffectStage("voice", 0);
      }

      playerHudUIState.icons.health.update(state => {
        state.progressValue = capAmountToHundred(data.health);
        state.isShowing = methods.staticGenericHundredHandleShow(state.dynamicShow, state.progressValue);
        if (data.playerDead) {
          ColorEffectStore.updateIconEffectStage("health", 1);
          state.progressValue = 100;
        } else {
          ColorEffectStore.updateIconEffectStage("health", 0);
        }
        return state;
      });

      playerHudUIState.icons.armor.update(state => {
        state.progressValue = capAmountToHundred(data.armor);
        state.isShowing = methods.staticGenericZeroHandleShow(state.dynamicShow, state.progressValue);
        return state;
      });
      if (data.armor <= 0) {
        ColorEffectStore.updateIconEffectStage("armor", 1);
      } else {
        ColorEffectStore.updateIconEffectStage("armor", 0);
      }

      playerHudUIState.icons.hunger.update(state => {
        state.progressValue = capAmountToHundred(data.hunger);
        state.isShowing = methods.staticGenericHundredHandleShow(state.dynamicShow, state.progressValue);
        return state;
      });
      if (data.hunger <= 30){
        ColorEffectStore.updateIconEffectStage("hunger", 1);
      } else {
        ColorEffectStore.updateIconEffectStage("hunger", 0);
      }

      playerHudUIState.icons.thirst.update(state => {
        state.progressValue = capAmountToHundred(data.thirst);
        state.isShowing = methods.staticGenericHundredHandleShow(state.dynamicShow, state.progressValue);
        return state;
      });
      if (data.thirst <= 30) {
        ColorEffectStore.updateIconEffectStage("thirst", 1);
      } else {
        ColorEffectStore.updateIconEffectStage("thirst", 0);
      }

      playerHudUIState.icons.stress.update(state => {
        state.progressValue = capAmountToHundred(data.stress);
        state.isShowing = methods.staticGenericZeroHandleShow(state.dynamicShow, state.progressValue);
        return state;
      })

      playerHudUIState.icons.oxygen.update(state => {
        state.progressValue = capAmountToHundred(data.oxygen);
        state.isShowing = methods.staticGenericHundredHandleShow(state.dynamicShow, state.progressValue);
        return state;
      })

      playerHudUIState.icons.armor.update(state => {
        if (data.armed) {
          state.isShowing = true;
        } else {
          state.isShowing = false;
        }
        return state;
      });

      playerHudUIState.icons.parachute.update(state => {
        state.progressValue = capAmountToHundred(data.parachute);
        if (data.parachute >= 0 ) {
          state.isShowing = true;
        } else {
          state.isShowing = false;
        }
        return state;
      })

      playerHudUIState.icons.engine.update(state => {
        state.progressValue = capAmountToHundred(data.engine);
        state.isShowing = methods.staticEngineHandleShow(state.dynamicShow, state.progressValue);
        return state;
      })
      if (data.engine <= 45) {
        ColorEffectStore.updateIconEffectStage("engine", 2);
      } else if (data.engine <= 75 && data.engine >= 46 ) {
        ColorEffectStore.updateIconEffectStage("engine", 1);
      } else if(data.engine <= 100) {
        ColorEffectStore.updateIconEffectStage("engine", 0);
      }

      playerHudUIState.icons.harness.update(state => {
        // I am guessing harness hp max is 20?
        state.progressValue = capAmountToHundred(data.hp*5);
        if (data.harness) {
          state.isShowing = true;
        } else {
          state.isShowing = false;
        }
        return state;
      });

      playerHudUIState.icons.cruise.update(state => {
        state.progressValue = capAmountToHundred(data.speed);
        if (data.cruise) {
          state.isShowing = true;
        } else {
          state.isShowing = false;
        }
        return state;
      });

      playerHudUIState.icons.nitro.update(state => {
        // This needs to be a number so default to 0
        state.progressValue = capAmountToHundred(data.nos || 0);
        state.isShowing = methods.staticNitroHandleShow(state.dynamicShow, state.progressValue, capAmountToHundred(data.engine));
        return state;
      });
      if (data.nitroActive) {
        ColorEffectStore.updateIconEffectStage("nitro", 1);
      } else {
        ColorEffectStore.updateIconEffectStage("nitro", 0);
      }

      playerHudUIState.icons.dev.update(state => {
        if (data.dev) {
          state.isShowing = true;
        } else {
          state.isShowing = false;
        }  
        return state;
      });
    },
    receiveUIUpdateMessage(data: playerHudIcons) {
      if (!data || !Object.keys(data).length) {
        return;
      }

      let key: any, value: any;
      for ([key, value] of Object.entries(data)) {
        playerHudUIState.icons[key].update(state => {
          state = {...createShapeIcon(value.shape,
            {
              icon: state.icon,
              isShowing: state.isShowing, name: state.name,
              progressValue: state.progressValue,
            }), ...value};
          return state;
        });
      }
      playerHudUIState.saveUIState.set("ready");
    },
    receiveProfileData(data) {
      methods.receiveUIUpdateMessage(data.icons);
      playerHudUIState.globalIconSettings.set(data.globalIconSettings);
      playerHudUIState.showingOrder.set(data.showingOrder);
    },
    staticGenericZeroHandleShow(staticSetting: boolean, currentValue: number): boolean {
      if (staticSetting) {
        return true;
      }
      if (currentValue == 0) {
        return false; 
      }
      return true;
    },
    staticEngineHandleShow(staticSetting: boolean, currentValue: number): boolean {
      // When in a car only show when less that 95% condition
      // Engine will be below 0 when not in a car so hide icon
      if (staticSetting) {
        if (currentValue < 0) {
          return false;
        } else {
          return true;
        }
      } else {
        if (currentValue >= 95) {
          return false; 
        } else if (currentValue < 0){
          return false;
        } else {
          return true;
        }
      }
    },
    staticGenericHundredHandleShow(staticSetting: boolean, currentValue: number): boolean {
      if (staticSetting) {
        return true;
      }
      if (currentValue >= 100) {
        return false; 
      }
      return true;
    },
    staticNitroHandleShow(staticSetting: boolean, currentValue: number, engineValue: number): boolean {
      if (staticSetting) {
        if (engineValue > 0) {
          return true
        } else {
          return false;
        }
      } else {
        if (currentValue <= 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  return {
    ...playerHudUIState,
    singleIcons,
    ...methods,
  }
}

export default store();