import { writable } from 'svelte/store'
import { faHeart, faShieldAlt, faHamburger, faTint, faBrain, faStream,
  faParachuteBox, faMeteor, faLungs, faOilCan, faUserSlash,
  faTachometerAltFast, faTerminal, faHeadset, faMicrophone,
} from '@fortawesome/free-solid-svg-icons'
import type { playerHudIcons, shapekind, layoutIconKind, iconNamesKind, optionalHudIconType } from '../types/types';
import { defaultHudIcon, createShapeIcon } from '../types/types';

type playerHudUIType = {
  globalIconSettings: optionalHudIconType,
  icons: playerHudIcons,
  layout: layoutIconKind
  show: boolean,
  showingOrder: Array<keyof playerHudIcons>
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
  radio: number,
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
  let debugShow: boolean = false;
  let playerHudUIState: playerHudUIType = {
    globalIconSettings: (({ isShowing, name, icon, progressValue, ...o }) => o)(defaultHudIcon()),
    icons: {
      voice: defaultHudIcon("voice", true || debugShow, "#FFFFFF", faMicrophone),
      health: defaultHudIcon("health", true ||debugShow, "rgb(33, 171, 97)", faHeart), //"#3FA554"
      armor: defaultHudIcon("armor", true || debugShow, "#326dbf", faShieldAlt),
      hunger: defaultHudIcon("hunger", true || debugShow, "#dd6e14", faHamburger),
      thirst: defaultHudIcon("thirst", false || debugShow, "#1a7cad", faTint),
      stress: defaultHudIcon("stress", false || debugShow, "rgb(220, 6, 6)", faBrain),
      oxygen: defaultHudIcon("oxygen", false || debugShow, "rgb(138, 168, 189)", faLungs),
      armed: defaultHudIcon("armed", false || debugShow, "rgb(255, 72, 133)", faStream),
      parachute: defaultHudIcon("parachute", false || debugShow, "rgb(185, 255, 40)", faParachuteBox),
      engine: defaultHudIcon("engine", false || debugShow, "#3FA554", faOilCan),
      harness: defaultHudIcon("harness", false || debugShow, "rgb(182, 72, 255)", faUserSlash),
      cruise: defaultHudIcon("cruise", false || debugShow, "rgb(255, 72, 133)", faTachometerAltFast),
      nos: defaultHudIcon("nos", false || debugShow, "#D64763", faMeteor),
      dev: defaultHudIcon("dev", false || debugShow, "rgb(0, 0, 0)", faTerminal),
    },
    layout: "standard",
    show: true,
    showingOrder: ["voice", "health", "armor", "hunger", "thirst", "stress", "oxygen", "armed",
      "parachute", "engine", "harness", "cruise", "nos", "dev"],
  }
  
  const { subscribe, set, update } = writable(playerHudUIState);

  const methods = {
    updateAllHeight(height: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].height = height;
        }
        return state;
      })
    },
    updateAllIconScale(scale: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].iconScaling = scale;
        }
        return state;
      });
    },
    updateAllIconColor(color: string) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].iconColor = color;
        }
        state.globalIconSettings.iconColor = color;
        return state;
      });
    },
    updateAllInnerColor(color: string) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].innerColor = color;
        }
        state.globalIconSettings.innerColor = color;
        return state;
      });
    },
    updateAllProgressColor(color: string) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].progressColor = color;
        }
        state.globalIconSettings.progressColor = color;
        return state;
      });
    },
    updateAllRingSize(ringSize: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].ringSize = ringSize;
        }
        return state;
      })
    },
    updateAllRoundXAxis(xAxisCurve: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].xAxisRound = xAxisCurve;
        }
        return state;
      })
    },
    updateAllRoundYAxis(yAxisCurve: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].yAxisRound = yAxisCurve;
        }
        return state;
      })
    },
    updateAllRotateDegree(degree: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].rotateDegree = degree;
        }
        return state;
      })
    },
    updateAllShapes(shape: shapekind) {
      update(state => {
        for (let icon in state.icons) {
          let defaultShape = createShapeIcon(shape, 
            {
              defaultColor: state.icons[icon].defaultColor, icon: state.icons[icon].icon, iconColor: state.icons[icon].iconColor,
              isShowing: state.icons[icon].isShowing, innerColor: state.icons[icon].innerColor, progressColor: state.icons[icon].progressColor,
              name: state.icons[icon].name
            });
          state.icons[icon] = defaultShape;
          state.icons[icon].shape = shape;
        }
        state.globalIconSettings.shape = shape;
        state.globalIconSettings = createShapeIcon(shape,
          {
          defaultColor: state.globalIconSettings.defaultColor, icon: state.globalIconSettings.icon, iconColor: state.globalIconSettings.iconColor,
          isShowing: state.globalIconSettings.isShowing, innerColor: state.globalIconSettings.innerColor, progressColor: state.globalIconSettings.progressColor,
          name: state.globalIconSettings.name
        });
        return state;
      })
    },
    updateAllTranslateIconX(x: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].iconTranslateX = x;
        }
        return state;
      })
    },
    updateAllTranslateIconY(y: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].iconTranslateY = y;
        }
        return state;
      })
    },
    updateAllTranslateX(x: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].translateX = x;
        }
        return state;
      })
    },
    updateAllTranslateY(y: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].translateY = y;
        }
        return state;
      })
    },
    updateAllWidth(width: number) {
      update(state => {
        for (let icon in state.icons) {
          state.icons[icon].width = width;
        }
        return state;
      })
    },
    updateIconShape(iconName: iconNamesKind, shape: shapekind) {
      update(state => {
         let defaultShape = createShapeIcon(shape, 
          {
            defaultColor: state.icons[iconName].defaultColor, icon: state.icons[iconName].icon, iconColor: state.icons[iconName].iconColor,
            isShowing: state.icons[iconName].isShowing, innerColor: state.icons[iconName].innerColor, progressColor: state.icons[iconName].progressColor,
            name: state.icons[iconName].name
          });
        state.icons[iconName] = defaultShape;
        state.icons[iconName].shape = shape;
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
    updateLayout(layout: layoutIconKind) {
      update(state => {
        state.layout = layout;
        return state;
      })
    },
    receiveMessage(data: playerHudUpdateMessageType) {
      update(state => {
        state.show = data.show;
        state.icons.health.progressValue = data.health;
        state.icons.armor.progressValue = data.armor;
        state.icons.thirst.progressValue = data.thirst;
        state.icons.hunger.progressValue = data.hunger;
        state.icons.stress.progressValue = data.stress;
        state.icons.voice.progressValue = data.voice;
        state.icons.oxygen.progressValue = data.oxygen;
        state.icons.parachute.progressValue = data.parachute;
        state.icons.engine.progressValue = data.engine;
        state.icons.harness.progressValue = data.hp*5; // I am guessing harness hp max is 20?
        state.icons.cruise.progressValue = data.speed;
        state.icons.nos.progressValue = data.nos;
        // I dont think this gets used
        // state.cruise = data.cruise;
        // Only data uses this, we just change nitro color
        // state.nitroActive = data.nitroActive;
        // Only data uses this,
        // state.harness = data.harness;
        // I dont think this gets used
        //state.cinematic = data.cinematic;

        if (data.dynamicHealth == true) {
          if (data.health >= 100) {
            state.icons.health.isShowing = false; 
          }
          else {
            state.icons.health.isShowing = true;
          }
        } else {
          state.icons.health.isShowing = true;
        }

        if (data.playerDead == false) {
          state.icons.health.progressColor = state.icons.health.defaultColor;
        } else {
          state.icons.health.progressColor = "#ff0000";
          state.icons.health.progressValue = 100;
        }
  
        if (data.dynamicArmor == true) {
          if (data.armor == 0) {
            state.icons.armor.isShowing = false; 
          } else {
            state.icons.armor.isShowing = true;
          }
        } else {
          state.icons.armor.isShowing = true;
        } 
  
        if (data.armor <= 0) {
          state.icons.armor.progressColor = "#FF0000";
        } else {
          state.icons.armor.progressColor = state.icons.armor.defaultColor;
        }
  
        if (data.dynamicHunger == true) {
          if (data.hunger >= 100) {
            state.icons.hunger.isShowing = false;
          } else {
            state.icons.hunger.isShowing = true;
          }
        } else {
          state.icons.hunger.isShowing = true;
        } 

        if (data.hunger <= 30){
          state.icons.hunger.progressColor  = "#ff0000";
        } else {
          state.icons.hunger.progressColor  = state.icons.hunger.defaultColor;
        }
  
        if (data.dynamicThirst == true) {
          if (data.thirst >= 100) {
            state.icons.thirst.isShowing = false;
          } else{
            state.icons.thirst.isShowing = true;
          }
        } else {
          state.icons.thirst.isShowing = true;
        }

        if (data.thirst <= 30) {
          state.icons.thirst.progressColor = "#ff0000";
        } else {
          state.icons.thirst.progressColor = state.icons.thirst.defaultColor;
        }
  
        if (data.dynamicStress == true) {
          if (data.stress == 0) {
            state.icons.stress.isShowing = false; 
          } else {
            state.icons.stress.isShowing = true;
          }
        } else {
          state.icons.stress.isShowing = true;
        } 
  
        if (data.dynamicOxygen == true) {
          if (data.oxygen >= 100) {
            state.icons.oxygen.isShowing = false;
          } else {
            state.icons.oxygen.isShowing = true;
          }
        } else {
          state.icons.oxygen.isShowing = true;
        } 
  
        // When in a car only show when less that 95% condition
        // Engine will be below 0 when not in a car so hide icon
        if (data.dynamicEngine == true) {
          if (data.engine >= 95) {
            state.icons.engine.isShowing = false; 
          } else if (data.engine < 0){
            state.icons.engine.isShowing = false;
          } else {
            state.icons.engine.isShowing = true;
          }
        } else {
          if (data.engine < 0) {
            state.icons.engine.isShowing = false;
          } else {
            state.icons.engine.isShowing = true;
          }
        } 

        if (data.engine <= 45) {
          state.icons.engine.progressColor = "#ff0000";
        } else if (data.engine <= 75 && data.engine >= 46 ) {
          state.icons.engine.progressColor = "#dd6e14";
        } else if(data.engine <= 100) {
          state.icons.engine.progressColor = state.icons.engine.defaultColor;
        } 
  
        if (data.dynamicNitro == true) {
          // Dont know why this would be undefined?
          // I guess if we are not in a car?
          if (data.nos <= 0 || data.nos == undefined) {
            state.icons.nos.isShowing = false;
          } else {
            state.icons.nos.isShowing = true;
          }  
        } else {
          if (data.nos <= 0) {
            state.icons.nos.isShowing = false;
          } else {
            state.icons.nos.isShowing = true;
          }
        }

        if (data.nitroActive) {
          state.icons.nos.progressColor = state.icons.nos.defaultColor;
        } else {
          state.icons.nos.progressColor = "#FFFFFF";
        }
  
        if (data.talking && data.radio) {
          state.icons.voice.progressColor = "#D64763";
        } else if (data.talking) {
          state.icons.voice.progressColor = '#FFFF3E';
        } else {
          state.icons.voice.progressColor = state.icons.voice.defaultColor;
        }

        // Dont know why this would be undefined?
        // I guess when we dont have a radio?
        if (data.radio != 0 && data.radio != undefined) {
          state.icons.voice.icon = faHeadset;
        // Dont know why this would be undefined?
        // I guess when we dont have a radio?
        } else if (data.radio == 0 || data.radio == undefined) {
          state.icons.voice.icon = faMicrophone;
        }

        if (data.cruise == true) {
          state.icons.cruise.isShowing = true;
        } else {
          state.icons.cruise.isShowing = false;
        }
  
        if (data.harness == true) {
          state.icons.harness.isShowing = true;
        } else {
          state.icons.harness.isShowing = false;
        }
        
        if (data.armed == true) {
          state.icons.armed.isShowing = true;
        } else {
          state.icons.armed.isShowing = false;
        }
  
        if (data.parachute >= 0 ) {
          state.icons.parachute.isShowing = true;
        } else {
          state.icons.parachute.isShowing = false;
        }
  
        if (data.dev == true ) {
          state.icons.dev.isShowing = true;
        } else {
          state.icons.dev.isShowing = false;
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

export default store()