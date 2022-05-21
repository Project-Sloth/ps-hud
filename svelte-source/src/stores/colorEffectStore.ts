import { writable } from 'svelte/store';
import type { playerHudColorEffects, iconNamesKind, colorNamesKind, colorEffect, shapekind } from '../types/types';
import { defaultColorEffect, defaultEditableColor, createEditableColor } from '../types/types';

interface colorEffectStoreType {
  icons: playerHudColorEffects,
  globalColorSettings: colorEffect,
}


const store = () => {

  const colorEffectState: colorEffectStoreType = {
    globalColorSettings: {
      editableColors: defaultEditableColor(),
      iconColor: "",
      iconContrast: 100,
      iconDropShadowAmount: 0,
      innerColor: "",
      name: "default",
      outlineColor: "",
      outlineContrast: 100,
      outlineDropShadowAmount: 0,
      progressColor: "",
      progressContrast: 100,
      progressDropShadowAmount: 0,
    },
    icons: {
      voice: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#FFFFFF"),
          defaultColorEffect("talking", "#FFFF3E"),
          defaultColorEffect("radioTalking", "#D64763"),
        ],
        editableColors: defaultEditableColor(),
      },
      health: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#21ab61"),
          defaultColorEffect("dead", "#ff0000"),
        ],
        editableColors: defaultEditableColor(),
      },
      armor: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#326dbf"),
          defaultColorEffect("noArmor", "#ff0000")
        ],
        editableColors: defaultEditableColor(),
      },
      hunger: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#dd6e14"),
          defaultColorEffect("starving", "#ff0000"),
        ],
        editableColors: defaultEditableColor(),
      },
      thirst: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#1a7cad"),
          defaultColorEffect("thirsty", "#ff0000"),
        ],
        editableColors: defaultEditableColor(),
      },
      stress: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#dc0606")],
        editableColors: defaultEditableColor(),
      },
      oxygen: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#8aa8bd")],
        editableColors: defaultEditableColor(),
      },
      armed: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#ff4885")],
        editableColors: defaultEditableColor(),
      },
      parachute: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#b9ff28")],
        editableColors: defaultEditableColor(),
      },
      engine: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#3FA554"),
          defaultColorEffect("minorDamage", "#dd6e14"),
          defaultColorEffect("majorDamage", "#ff0000"),
        ],
        editableColors: defaultEditableColor(),
      },
      harness: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#b648ff")],
        editableColors: defaultEditableColor(),
      },
      cruise: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#ff4885")],
        editableColors: defaultEditableColor(),
      },
      nitro: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#ffffff"),
          defaultColorEffect("active", "#D64763"),
        ],
        editableColors: defaultEditableColor(),
      },
      dev: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#000000")],
        editableColors: defaultEditableColor(),
      },
    }
  }

  const { subscribe, set, update } = writable(colorEffectState);

  const methods = {
    updateAllDefaultEffectColorSetting(colorSetting: colorNamesKind, newValue: any) {
      update(state => {
        for (let iconColorEffect of Object.keys(state.icons)) {
          state.icons[iconColorEffect].colorEffects[0][colorSetting] = newValue;
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
        for (let iconColorEffect of Object.values(state.icons)) {
          iconColorEffect.colorEffects[0].iconColor = iconColorEffect.colorEffects[0].progressColor;
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