import { get, writable } from 'svelte/store';
import PlayerHudStore from './playerStatusHudStore';
import type { optionalHudIconType } from '../types/types';
import { createShapeIcon } from '../types/types';
import { faDatabase, faWind, faExclamation, faLightbulb, faDollarSign, faPersonSwimming,
  faDumbbell, faBiohazard, faLocationArrow, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface externalStatusStateType {
  [key: string]: optionalHudIconType;
}


interface buffStatusMessage {
  display: boolean // Should we show this icon
  iconColor?: string // Not need, but if they want to update it they can
  iconName?: string
  buffName: string
  // We need to allow 0 to be showing
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

          let defaultShape = createShapeIcon(playerStatusdata.globalIconSettings.shape, 
            {
              icon: getIconData(data.iconName), iconColor: data.iconColor || "#FFFFFF",
              isShowing: data.display || true, name: name,
              progressValue: data.progressValue || 0,
            });
          defaultShape.progressColor = data.progressColor || "#FFD700"; // gold color
          
          state[name] = defaultShape;
  
          return state;
        }

        if (!isNaN(data.progressValue) && data.progressValue >= 0) {
          state[name].progressValue = data.progressValue;
        } else if (data.display != null && data.display != undefined && !data.display) {
          state = delete state[name] && state;
        } else {
          console.error("QB-Buffs error: Buff State Message malformed!");
        }

        return state;
      });
    },

    receiveEnhancementStatusMessage(data: enhancementStatusMessage) {
      const name = data.enhancementName;
      if (!name) {
        console.error("QB-Buffs error: Enchancement Message name malformed:", data.enhancementName);
        return;
      }
      const playerIconName = name.replace('super-','');

      update(state => {
        if (!state[name] && data.display && data.iconColor) {
          const playerStatusdata = get(PlayerHudStore);
          const playerIcon = playerStatusdata.icons[playerIconName];
          if (!playerIcon) {
            console.error("QB-Buffs error: Enhancement Message name not valid:", data.enhancementName);
            return state;
          }

          // Saving this as the old reference to put back when enchancement is over
          state[name] = { iconColor: playerIcon.iconColor };

          PlayerHudStore.updateIconSetting(playerIconName as any, "iconColor", data.iconColor);

        } else if (data.display === false) {
          if (!state[name]) {
            console.error("QB-Buffs error: Enchancement name not found:", data.enhancementName);
            return state;
          }
          
          PlayerHudStore.updateIconSetting(playerIconName as any, "iconColor", state[name].iconColor);
          state = delete state[name] && state;

        } else {
          console.error("QB-Buffs error: Enhancement Message malformed:", data);
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