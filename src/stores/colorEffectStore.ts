import { writable } from 'svelte/store';
import type { playerHudColorEffects, iconNamesKind } from '../types/types';


const store = () => {

  const colorEffectState: playerHudColorEffects = {
    voice: {
      currentEffect: 0,
      colorEffects: [
        { name: "default", color: "#FFFFFF" },
        { name: "talking", color: "#ffff3e" },
        { name: "radioTalking", color: "#D64763" },
      ],
    },
    health: {
      currentEffect: 0,
      colorEffects: [
        { name: "default", color: "rgb(33, 171, 97)" },
        { name: "dead", color: "#ff0000" },
      ],
    },
    armor: {
      currentEffect: 0,
      colorEffects: [
        { name: "default", color: "#326dbf" },
        { name: "noArmor", color: "#ff0000" },
      ],
    },
    hunger: {
      currentEffect: 0,
      colorEffects: [
        { name: "default", color: "#dd6e14" },
        { name: "starving", color: "#ff0000" },
      ],
    },
    thirst: {
      currentEffect: 0,
      colorEffects: [
        { name: "default", color: "#1a7cad" },
        { name: "thirsty", color: "#ff0000" },
      ],
    },
    stress: {
      currentEffect: 0,
      colorEffects: [{ name: "default", color: "rgb(220, 6, 6)" }],
    },
    oxygen: {
      currentEffect: 0,
      colorEffects: [{ name: "default", color: "rgb(138, 168, 189)" }],
    },
    armed: {
      currentEffect: 0,
      colorEffects: [{ name: "default", color: "rgb(255, 72, 133)" }],
    },
    parachute: {
      currentEffect: 0,
      colorEffects: [{ name: "default", color: "rgb(185, 255, 40)" }],
    },
    engine: {
      currentEffect: 0,
      colorEffects: [
        { name: "default", color: "#3FA554" },
        { name: "minorDamage", color: "#dd6e14" },
        { name: "majorDamage", color: "#ff0000" },
      ],
    },
    harness: {
      currentEffect: 0,
      colorEffects: [{ name: "default", color: "rgb(182, 72, 255)" }],
    },
    cruise: {
      currentEffect: 0,
      colorEffects: [{ name: "default", color: "rgb(255, 72, 133)" }],
    },
    nitro: {
      currentEffect: 0,
      colorEffects: [
        { name: "default", color: "#ffffff" },
        { name: "active", color: "#D64763" },
      ],
    },
    dev: {
      currentEffect: 0,
      colorEffects: [{ name: "default", color: "rgb(0, 0, 0)" }],
    },
  }

  const { subscribe, set, update } = writable(colorEffectState);
  // const [key, value] of Object.entries(object1)
  const methods = {
    updateAllColorEffectDefaultColor(newColor: string) {
      update(state => {
        for (let iconColorEffect of Object.values(state)) {
          iconColorEffect.colorEffects[0].color = newColor;
        }
        return state;
      })
    },
    updateIconColorEffectStage(iconName: iconNamesKind, stageNumber: number) {
      update(state => {
        if (stageNumber < 0 || stageNumber > state[iconName].colorEffects.length-1) {
          return state;
        }
        state[iconName].currentEffect = stageNumber;
        return state;
      })
    },
    updateProgressColor(iconName: iconNamesKind, stageNumber: number, newColor: string) {
      update(state => {
        if (stageNumber < 0 || stageNumber > state[iconName].colorEffects.length-1) {
          return state;
        }
        state[iconName].colorEffects[stageNumber].color = newColor;
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