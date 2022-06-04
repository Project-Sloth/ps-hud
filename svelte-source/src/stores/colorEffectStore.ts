import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import PlayerHudStore from '../stores/playerStatusHudStore';
import type { playerHudColorEffects, iconNamesKind, colorNamesKind, shapekind, globalEditableColorsType } from '../types/types';
import { defaultColorEffect, defaultEditableColor, createEditableColor, colorStoreLocalStorageName } from '../types/types';

export interface colorEffectStoreType {
  icons: playerHudColorEffects,
  globalColorSettings: globalEditableColorsType,
}

const store = () => {
  let stored: string = localStorage.getItem(colorStoreLocalStorageName);
  let storedObject: object = {};
  if (stored) {
    storedObject = JSON.parse(stored);
  }

  function getLocalStorage(key: iconNamesKind | "globalColorSettings", fallback: any) {
    if (storedObject && storedObject[key] != null) {
      return storedObject[key];
    }
    return fallback;
  }

  function getDefaultSettings(): colorEffectStoreType {
    return {
      globalColorSettings: getLocalStorage("globalColorSettings",
        {
          editableColors: defaultEditableColor(),
          editSingleIconName: "voice",
          editSingleIconStage: 0,
          iconColor: "",
          iconContrast: 100,
          iconDropShadowAmount: 0,
          innerColor: "",
          outlineColor: "",
          outlineContrast: 100,
          outlineDropShadowAmount: 0,
          progressColor: "",
          progressContrast: 100,
          progressDropShadowAmount: 0,
        }),
      icons: {
        voice: getLocalStorage("voice", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("not-talking", "#FFFFFF"),
            defaultColorEffect("talking", "#FFFF3E"),
            defaultColorEffect("radio-talking", "#D64763"),
          ],
          editableColors: defaultEditableColor(),
        }),
        health: getLocalStorage("health", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("alive", "#21ab61"),
            defaultColorEffect("dead", "#ff0000"),
          ],
          editableColors: defaultEditableColor(),
        }),
        armor: getLocalStorage("armor", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("armor", "#326dbf"),
            defaultColorEffect("no-armor", "#ff0000")
          ],
          editableColors: defaultEditableColor(),
        }),
        hunger: getLocalStorage("hunger", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("normal", "#dd6e14"),
            defaultColorEffect("starving", "#ff0000"),
          ],
          editableColors: defaultEditableColor(),
        }),
        thirst: getLocalStorage("thirst", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("normal", "#1a7cad"),
            defaultColorEffect("thirsty", "#ff0000"),
          ],
          editableColors: defaultEditableColor(),
        }),
        stress: getLocalStorage("stress", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#dc0606")],
          editableColors: defaultEditableColor(),
        }),
        oxygen: getLocalStorage("oxygen", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#8aa8bd")],
          editableColors: defaultEditableColor(),
        }),
        armed: getLocalStorage("armed", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#ff4885")],
          editableColors: defaultEditableColor(),
        }),
        parachute: getLocalStorage("parachute", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#b9ff28")],
          editableColors: defaultEditableColor(),
        }),
        engine: getLocalStorage("engine", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("no-damage", "#3FA554"),
            defaultColorEffect("minor-damage", "#dd6e14"),
            defaultColorEffect("major-damage", "#ff0000"),
          ],
          editableColors: defaultEditableColor(),
        }),
        harness: getLocalStorage("harness", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#b648ff")],
          editableColors: defaultEditableColor(),
        }),
        cruise: getLocalStorage("cruise", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#ff4885")],
          editableColors: defaultEditableColor(),
        }),
        nitro: getLocalStorage("nitro", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("no-nitro", "#ffffff"),
            defaultColorEffect("active-nitro", "#D64763"),
          ],
          editableColors: defaultEditableColor(),
        }),
        dev: getLocalStorage("dev", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#000000")],
          editableColors: defaultEditableColor(),
        }),
      }
    }
  }

  const colorEffectState: colorEffectStoreType = getDefaultSettings();

  const { subscribe, set, update } = writable(colorEffectState);

  const methods = {
    resetColorEffects() {
      storedObject = {};
      localStorage.removeItem(colorStoreLocalStorageName);
      set(getDefaultSettings()); 
    },
    receiveUIUpdateMessage(data) {
      if (!data || !Object.keys(data).length) {
        return;
      }
      let statusIconData = get(PlayerHudStore);
      update(state => {
        let key: any, value: any;
        for ([key, value] of Object.entries(data)) {
          state.icons[key] = {
            currentEffect: 0,
            editableColors: createEditableColor(statusIconData.icons[key].shape),
            colorEffects: value.colorEffects,
          }
        }
        return state;
      })
    },
    updateAllDefaultEffectColorSetting(colorSetting: colorNamesKind, newValue: any) {
      update(state => {
        for (let iconColorEffect of Object.keys(state.icons)) {
          switch (colorSetting) {
            case "progressDropShadowAmount":
            case "iconDropShadowAmount":
            case "outlineDropShadowAmount":
              for (let effectStage of state.icons[iconColorEffect].colorEffects) {
                effectStage[colorSetting] = newValue;
              }
              break;
            default:
              state.icons[iconColorEffect].colorEffects[0][colorSetting] = newValue;
              break;
          }
        }
        state.globalColorSettings[colorSetting as any] = newValue;
        return state;
      })
    },
    updateAllIconShapeEditableColor(shape: shapekind) {
      update(state => {
        let newEditableSettings = createEditableColor(shape);
        for (let icon in state.icons) {
          state.icons[icon].editableColors = newEditableSettings;
        }
        state.globalColorSettings.editableColors = newEditableSettings;
        return state;
      })
    },
    updateDefaultEffectColorSetting(iconName: iconNamesKind, colorSetting: colorNamesKind, newValue: any) {
      update(state => {
        state.icons[iconName].colorEffects[0][colorSetting as any] = newValue;
        return state;
      })
    },
    updateIconColorToProgressColor() {
      update(state => {
        for (const iconColorEffect of Object.values(state.icons)) {
          for (const iconColorState of iconColorEffect.colorEffects) {
            iconColorState.iconColor = iconColorState.progressColor;
          }
        }
        return state;
      })
    },
    updateIconEffectStage(iconName: iconNamesKind, stageNumber: number) {
      update(state => {
        if (stageNumber < 0 || stageNumber > state.icons[iconName].colorEffects.length-1) {
          return state;
        }
        state.icons[iconName].currentEffect = stageNumber;
        return state;
      })
    },
    updateIconShapeEditableColor(iconName: iconNamesKind, shape: shapekind) {
      update(state => {
        state.icons[iconName].editableColors = createEditableColor(shape);
        return state;
      })
    },
    updateColorSetting(iconName: iconNamesKind, stageNumber: number, settingName: colorNamesKind, newValue: any) {
      update(state => {
        if (stageNumber < 0 || stageNumber > state.icons[iconName].colorEffects.length-1) {
          return state;
        }
        state.icons[iconName].colorEffects[stageNumber][settingName as any] = newValue;
        return state;
      })
    },
    updateProgressColor(iconName: iconNamesKind, stageNumber: number, newColor: string) {
      update(state => {
        if (stageNumber < 0 || stageNumber > state.icons[iconName].colorEffects.length-1) {
          return state;
        }
        state.icons[iconName].colorEffects[stageNumber].progressColor = newColor;
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