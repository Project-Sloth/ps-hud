import { get, writable } from 'svelte/store';
import PlayerHudStore from './playerStatusHudStore';
import type { optionalHudIconMetaShapeType, iconNamesKind } from '../types/types';
import { createShapeIcon, iconNames } from '../types/types';
import { faDatabase, faWind, faExclamation, faLightbulb, faDollarSign, faPersonSwimming,
  faDumbbell, faBiohazard, faLocationArrow, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3-color'

interface externalStatusStateType {
  [key: string]: optionalHudIconMetaShapeType;
}

interface buffStatusMessage {
  display: boolean // Should we show this icon
  iconColor?: string // Not need, but if they want to update it they can
  iconName?: string
  buffName: string
  // We need to allow 0 to be showing
  outlineColor?: string
  progressColor?: string // Not needed, but if they want to update it they can
  progressValue?: number // This needs to be from 1 - 100 (do we need to verify this?)
}

interface enhancementStatusMessage {
  display: boolean // Should we show this icon
  iconColor?: string
  enhancementName: string
}

const iconDataObj: { [key: string]: IconDefinition } = {
  "biohazard": faBiohazard,
  "database": faDatabase,
  "dollarsign": faDollarSign,
  "dumbbell": faDumbbell,
  "exclamation": faExclamation,
  "lightbulb": faLightbulb,
  "locationarrow": faLocationArrow,
  "swimming": faPersonSwimming,
  "wind": faWind,
}

function getIconData(iconName: string): IconDefinition {
  const iconData = iconDataObj[iconName] || faExclamation
  return iconData
}

const store = () => {

  const externalStatusState: externalStatusStateType = {}

  const { subscribe, set, update } = writable(externalStatusState);

  const methods = {
    receiveBuffStatusMessage(data: buffStatusMessage) {
      const name = data.buffName;

      update(state => {
        if (!state[name]) {
          const playerStatusdata = get(PlayerHudStore);
          const playerHealthShape = playerStatusdata.icons.health;
          let defaultShape = {
              ...playerHealthShape,
              icon: getIconData(data.iconName),
              isShowing: data.display || true, name: name,
              progressValue: data.progressValue || 0,
          };
          
          let progressColor = data.progressColor || "#FFD700";
          let outlineColor = data.outlineColor;
          let iconColor = data.iconColor || "#FFFFFF";

          if (!outlineColor) {
            let newOutlineColor = d3.color(progressColor);
            newOutlineColor.opacity = 0.4;
            outlineColor = newOutlineColor.formatHex8();
          }

          let externalStatusIcon: optionalHudIconMetaShapeType = { ...defaultShape, iconColor, outlineColor, progressColor };
          
          state[name] = externalStatusIcon;
  
          return state;
        }

        if (!isNaN(data.progressValue) && data.progressValue >= 0) {
          state[name].progressValue = data.progressValue;
        } else if (data.display != null && data.display != undefined && !data.display) {
          state = delete state[name] && state;
        } else {
          console.error("PS-Buffs error: Buff State Message malformed!");
        }

        return state;
      });
    },

    receiveEnhancementStatusMessage(data: enhancementStatusMessage) {
      const name = data.enhancementName;
      if (!name) {
        console.error("PS-Buffs error: Enchancement Message name malformed:", data.enhancementName);
        return;
      }
      const playerIconName: iconNamesKind = name.replace('super-','') as iconNamesKind;

      if (!iconNames.includes(playerIconName)) {
        console.error("PS-Buffs error: Enhancement Message name not valid:", data.enhancementName);
        return;
      }

      update(state => {
        if (!state[playerIconName] && data.display && data.iconColor) {
          state[playerIconName] = { iconColor: data.iconColor };
        } else if (data.display === false) {
          if (!state[playerIconName]) {
            console.error("PS-Buffs error: Enchancement name not found:", data.enhancementName);
            return state;
          }

          state = delete state[playerIconName] && state;

        } else {
          console.error("PS-Buffs error: Enhancement Message malformed:", data);
        }

        return state;
      });
    },
  }

  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store();