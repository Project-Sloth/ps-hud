import { writable } from 'svelte/store';
import type { playerHudColorEffects, iconNamesKind, colorNamesKind, colorEffect } from '../types/types';
import { defaultColorEffect } from '../types/types';

interface colorEffectStoreType {
  icons: playerHudColorEffects,
  globalColorSettings: colorEffect,
}


const store = () => {

  const colorEffectState: colorEffectStoreType = {
    globalColorSettings: {
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
      },
      health: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#21ab61"),
          defaultColorEffect("dead", "#ff0000"),
        ],
      },
      armor: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#326dbf"),
          defaultColorEffect("noArmor", "#ff0000")
        ],
      },
      hunger: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#dd6e14"),
          defaultColorEffect("starving", "#ff0000"),
        ],
      },
      thirst: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#1a7cad"),
          defaultColorEffect("thirsty", "#ff0000"),
        ],
      },
      stress: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#dc0606")],
      },
      oxygen: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#8aa8bd")],
      },
      armed: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#ff4885")],
      },
      parachute: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#b9ff28")],
      },
      engine: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#3FA554"),
          defaultColorEffect("minorDamage", "#dd6e14"),
          defaultColorEffect("majorDamage", "#ff0000"),
        ],
      },
      harness: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#b648ff")],
      },
      cruise: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#ff4885")],
      },
      nitro: {
        currentEffect: 0,
        colorEffects: [
          defaultColorEffect("default", "#ffffff"),
          defaultColorEffect("active", "#D64763"),
        ],
      },
      dev: {
        currentEffect: 0,
        colorEffects: [defaultColorEffect("default", "#000000")],
      },
    }
  }

  const { subscribe, set, update } = writable(colorEffectState);

  const methods = {
    updateAllDefaultEffectColorSetting(colorSetting: colorNamesKind, settingValue: any) {
      update(state => {
        for (let iconColorEffect of Object.values(state.icons)) {
          iconColorEffect.colorEffects[0][colorSetting as any] = settingValue;
        }
        state.globalColorSettings[colorSetting as any] = settingValue;
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
    updateProgressColor(iconName: iconNamesKind, stageNumber: number, newColor: string) {
      update(state => {
        if (stageNumber < 0 || stageNumber > state.icons[iconName].colorEffects.length-1) {
          return state;
        }
        state.icons[iconName].colorEffects[stageNumber].progressColor = newColor;
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
    }
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store();