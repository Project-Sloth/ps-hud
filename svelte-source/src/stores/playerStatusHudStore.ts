import { writable } from 'svelte/store'
import { faHeart, faShieldAlt, faHamburger, faTint, faBrain, faStream,
  faParachuteBox, faMeteor, faLungs, faOilCan, faUserSlash,
  faTachometerAltFast, faTerminal, faHeadset, faMicrophone,
} from '@fortawesome/free-solid-svg-icons'
import type { playerHudIcons, shapekind, iconNamesKind, optionalHudIconType } from '../types/types';
import { defaultHudIcon, createShapeIcon } from '../types/types';
import ColorEffectStore from './colorEffectStore';
import MenuStore from './menuStore';

type saveUIType = "ready" | "updating";

type playerStatusType = {
  designMode: boolean,
  designProgress: number,
  globalIconSettings: optionalHudIconType,
  icons: playerHudIcons,
  saveUIState: saveUIType,
  show: boolean,
  showingOrder: Array<keyof playerHudIcons>
}

type playerHudShowMessageType = {
  show: boolean,
}

type playerHudUpdateMessageType = {
  show: boolean,
  dynamicHealth: boolean,
  dynamicArmor: boolean,
  dynamicHunger: boolean,
  dynamicThirst: boolean,
  dynamicStress: boolean,
  dynamicOxygen: boolean,
  dynamicEngine: boolean,
  dynamicNitro: boolean,
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
  const playerHudUIState: playerStatusType = {
    designMode: false,
    designProgress: 0,
    globalIconSettings: (({ isShowing, name, icon, progressValue, ...o }) => o)(defaultHudIcon()),
    icons: {
      voice: defaultHudIcon("voice", true, "#FFFFFF", faMicrophone),
      health: defaultHudIcon("health", true, "rgb(33, 171, 97)", faHeart), //"#3FA554"
      armor: defaultHudIcon("armor", true, "#326dbf", faShieldAlt),
      hunger: defaultHudIcon("hunger", true, "#dd6e14", faHamburger),
      thirst: defaultHudIcon("thirst", true, "#1a7cad", faTint),
      stress: defaultHudIcon("stress", false, "rgb(220, 6, 6)", faBrain),
      oxygen: defaultHudIcon("oxygen", false, "rgb(138, 168, 189)", faLungs),
      armed: defaultHudIcon("armed", false, "rgb(255, 72, 133)", faStream),
      parachute: defaultHudIcon("parachute", false, "rgb(185, 255, 40)", faParachuteBox),
      engine: defaultHudIcon("engine", false, "#3FA554", faOilCan),
      harness: defaultHudIcon("harness", false, "rgb(182, 72, 255)", faUserSlash),
      cruise: defaultHudIcon("cruise", false, "rgb(255, 72, 133)", faTachometerAltFast),
      nitro: defaultHudIcon("nitro", false, "#D64763", faMeteor),
      dev: defaultHudIcon("dev", false, "rgb(0, 0, 0)", faTerminal),
    },
    saveUIState: "ready",
    show: false,
    showingOrder: ["voice", "health", "armor", "hunger", "thirst", "stress", "oxygen", "armed",
      "parachute", "engine", "harness", "cruise", "nitro", "dev"],
  }
  
  const { subscribe, set, update } = writable(playerHudUIState);

  let staticArmor: boolean, staticEngine: boolean, staticHealth: boolean, staticHunger: boolean,
      staticNitro: boolean, staticOxygen: boolean, staticStress: boolean, staticThirst: boolean = false;

  // Setting up menuStore subscribe method to update whether to show icons
  // Need setTimeout to resolve import initialization
  setTimeout(() => {
    MenuStore.subscribe((val => {
      staticArmor  = val.isStaticArmorChecked;
      staticEngine = val.isStaticEngineChecked;
      staticHealth = val.isStaticHealthChecked;
      staticHunger = val.isStaticHungerChecked;
      staticNitro  = val.isStaticNitroChecked;
      staticOxygen = val.isStaticOxygenChecked;
      staticStress = val.isStaticStressChecked;
      staticThirst = val.isStaticThirstChecked;
    }))
  }, 0);

  const methods = {
    updateAllIconsSettings(settingName: keyof optionalHudIconType, value: any) {
      update(state => {
        for (let icon in state.icons) {
          if (state.icons[icon][settingName] != null) {
            state.icons[icon][settingName] = value;
          }
        }
        return state;
      })
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
    updateAllIconColor(color: string) {
      methods.updateAllIconsSettings("iconColor", color);
      update(state => {
        state.globalIconSettings.iconColor = color;
        return state
      });
    },
    updateAllInnerColor(color: string) {
      methods.updateAllIconsSettings("innerColor", color)
      update(state => {
        state.globalIconSettings.innerColor = color;
        return state
      });
    },
    updateAllProgressColor(color: string) {
      ColorEffectStore.updateAllColorEffectDefaultColor(color);
      update(state => {
        state.globalIconSettings.progressColor = color;
        return state
      });
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
      update(state => {
        for (let icon in state.icons) {
          let defaultShape = createShapeIcon(shape, 
            {
              icon: state.icons[icon].icon, iconColor: state.icons[icon].iconColor,
              isShowing: state.icons[icon].isShowing, innerColor: state.icons[icon].innerColor, name: state.icons[icon].name,
              progressValue: state.icons[icon].progressValue,
            });
          state.icons[icon] = defaultShape;
        }

        // Needs to stay the same to prevent a color change from color-picker to be applied to all status icon colors
        // when we just only want to just change the shape and its values but keep the color the same for all icons
        const tempColor = state.globalIconSettings.progressColor;
        state.globalIconSettings = (({ isShowing, name, icon, progressValue, ...o }) => o)(createShapeIcon(shape,
          {
          icon: state.globalIconSettings.icon, iconColor: state.globalIconSettings.iconColor,
          isShowing: state.globalIconSettings.isShowing, innerColor: state.globalIconSettings.innerColor, name: state.globalIconSettings.name,
        }));
        state.globalIconSettings.progressColor = tempColor;
        return state;
      })
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
      update(state => {
         let defaultShape = createShapeIcon(shape, 
          {
            icon: state.icons[iconName].icon, iconColor: state.icons[iconName].iconColor,
            isShowing: state.icons[iconName].isShowing, innerColor: state.icons[iconName].innerColor,
            name: state.icons[iconName].name, progressValue: state.icons[iconName].progressValue
          });
        state.icons[iconName] = defaultShape;
        return state;
      })
    },
    updateIconSetting(iconName: iconNamesKind, settingName: keyof optionalHudIconType, value: any) {
      update(state => {
        // keyof optionalHudIconType does not want to work, so we force any to pass type check
        // keyof should work since its the exact same type as what key we are trying
        state.icons[iconName][settingName as any] = value;
        return state;
     })
    },
    receiveShowMessage(data: playerHudShowMessageType) {
      update(state => {
        state.show = data.show;
        return state;
      });
    },
    receiveStatusUpdateMessage(data: playerHudUpdateMessageType) {
      update(state => {
        //console.log("status icon data", data);
        state.show = data.show;
        state.icons.health.progressValue = data.health;
        state.icons.armor.progressValue = data.armor;
        state.icons.thirst.progressValue = data.thirst;
        state.icons.hunger.progressValue = data.hunger;
        state.icons.stress.progressValue = data.stress;
        state.icons.voice.progressValue = data.voice * 16.6; // Should be 1.5, 3, 6 so * 16.6 to show progress
        state.icons.oxygen.progressValue = data.oxygen;
        state.icons.parachute.progressValue = data.parachute;
        state.icons.engine.progressValue = data.engine;
        state.icons.harness.progressValue = data.hp*5; // I am guessing harness hp max is 20?
        state.icons.cruise.progressValue = data.speed;
        state.icons.nitro.progressValue = data.nos || 0; // This needs to be a number so default to 0
        // I dont think this gets used
        // state.cruise = data.cruise;
        // Only data uses this, we just change nitro color
        // state.nitroActive = data.nitroActive;
        // Only data uses this,
        // state.harness = data.harness;
        // I dont think this gets used
        //state.cinematic = data.cinematic;

        if (staticHealth) {
          state.icons.health.isShowing = true;
        } else {
          if (data.health >= 100) {
            state.icons.health.isShowing = false; 
          }
          else {
            state.icons.health.isShowing = true;
          }
        }

        if (data.playerDead) {
          ColorEffectStore.updateIconColorEffectStage("health", 1);
          state.icons.health.progressValue = 100;
        } else {
          ColorEffectStore.updateIconColorEffectStage("health", 0);
        }
  
        if (staticArmor) {
          state.icons.armor.isShowing = true;
        } else {
          if (data.armor == 0) {
            state.icons.armor.isShowing = false; 
          } else {
            state.icons.armor.isShowing = true;
          }
        } 
  
        if (data.armor <= 0) {
          ColorEffectStore.updateIconColorEffectStage("armor", 1);
        } else {
          ColorEffectStore.updateIconColorEffectStage("armor", 0);
        }
  
        if (staticHunger) {
          state.icons.hunger.isShowing = true;
        } else {
          if (data.hunger >= 100) {
            state.icons.hunger.isShowing = false;
          } else {
            state.icons.hunger.isShowing = true;
          }
        } 

        if (data.hunger <= 30){
          ColorEffectStore.updateIconColorEffectStage("hunger", 1);
        } else {
          ColorEffectStore.updateIconColorEffectStage("hunger", 0);
        }
  
        if (staticThirst) {
          state.icons.thirst.isShowing = true;
        } else {
          if (data.thirst >= 100) {
            state.icons.thirst.isShowing = false;
          } else{
            state.icons.thirst.isShowing = true;
          }
        }

        if (data.thirst <= 30) {
          ColorEffectStore.updateIconColorEffectStage("thirst", 1);
        } else {
          ColorEffectStore.updateIconColorEffectStage("thirst", 0);
        }
  
        if (staticStress) {
          state.icons.stress.isShowing = true;
        } else {
          if (data.stress == 0) {
            state.icons.stress.isShowing = false; 
          } else {
            state.icons.stress.isShowing = true;
          }
        }
  
        if (staticOxygen) {
          state.icons.oxygen.isShowing = true;
        } else {
          if (data.oxygen >= 100) {
            state.icons.oxygen.isShowing = false;
          } else {
            state.icons.oxygen.isShowing = true;
          }
        }
  
        // When in a car only show when less that 95% condition
        // Engine will be below 0 when not in a car so hide icon
        if (staticEngine) {
          if (data.engine < 0) {
            state.icons.engine.isShowing = false;
          } else {
            state.icons.engine.isShowing = true;
          }
        } else {
          if (data.engine >= 95) {
            state.icons.engine.isShowing = false; 
          } else if (data.engine < 0){
            state.icons.engine.isShowing = false;
          } else {
            state.icons.engine.isShowing = true;
          }
        }

        if (data.engine <= 45) {
          ColorEffectStore.updateIconColorEffectStage("engine", 2);
        } else if (data.engine <= 75 && data.engine >= 46 ) {
          ColorEffectStore.updateIconColorEffectStage("engine", 1);
        } else if(data.engine <= 100) {
          ColorEffectStore.updateIconColorEffectStage("engine", 0);
        } 
  
        if (staticNitro) {
          if (data.nos <= 0) {
            state.icons.nitro.isShowing = false;
          } else {
            state.icons.nitro.isShowing = true;
          }
        } else {
          // Dont know why this would be undefined?
          // I guess if we are not in a car?
          if (data.nos <= 0 || data.nos == undefined) {
            state.icons.nitro.isShowing = false;
          } else {
            state.icons.nitro.isShowing = true;
          }
        }

        if (data.nitroActive) {
          ColorEffectStore.updateIconColorEffectStage("nitro", 1);
        } else {
          ColorEffectStore.updateIconColorEffectStage("nitro", 0);
        }
  
        if (data.talking) {
          if (data.radioTalking) {
            ColorEffectStore.updateIconColorEffectStage("voice", 2);
          } else {
            ColorEffectStore.updateIconColorEffectStage("voice", 1);
          }
        } else {
          ColorEffectStore.updateIconColorEffectStage("voice", 0);
        }

        if (data.radioChannel && data.radioChannel > 0) {
          state.icons.voice.icon = faHeadset;
        } else {
          state.icons.voice.icon = faMicrophone;
        }

        if (data.cruise) {
          state.icons.cruise.isShowing = true;
        } else {
          state.icons.cruise.isShowing = false;
        }
  
        if (data.harness) {
          state.icons.harness.isShowing = true;
        } else {
          state.icons.harness.isShowing = false;
        }
        
        if (data.armed) {
          state.icons.armed.isShowing = true;
        } else {
          state.icons.armed.isShowing = false;
        }
  
        if (data.parachute >= 0 ) {
          state.icons.parachute.isShowing = true;
        } else {
          state.icons.parachute.isShowing = false;
        }
  
        if (data.dev) {
          state.icons.dev.isShowing = true;
        } else {
          state.icons.dev.isShowing = false;
        }

        return state;
      });
    },
    receiveUIUpdateMessage(data) {
      if (!data || !data.icons || !Object.keys(data.icons).length) {
        return;
      }
      update(state => {
        let key: any, value: any;
        for ([key, value] of Object.entries(data.icons)) {
          state.icons[key] = {...createShapeIcon(value.shape,
            {
            icon: state.icons[key].icon,
            isShowing: state.icons[key].isShowing, name: state.icons[key].name,
            progressValue: state.icons[key].progressValue,}
            ), ...value};
        }
        state.saveUIState = "ready";
        return state;
      });
    }
  }

  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store();