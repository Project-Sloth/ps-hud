import { writable } from 'svelte/store'
import { faHeadset, faMicrophone, IconDefinition } from '@fortawesome/free-solid-svg-icons'

type playerHudType = {
  // Only gets used by update data
  // dynamicHealth: boolean,
  // dynamicArmor: boolean,
  // dynamicHunger: boolean,
  // dynamicThirst: boolean,
  // dynamicStress: boolean,
  // dynamicOxygen: boolean,
  // dynamicEngine: boolean,
  // dynamicNitro: boolean,
  nos: number,
  static: number,
  health: number,
  // Only gets used by update data
  // playerDead: boolean,
  armor: number,
  hunger: number,
  thirst: number,
  stress: number,
  voice: number,
  // Only gets used by update data
  // radio: number,
  // Only gets used by update data
  // harness: boolean,
  // Only gets used by update data
  // nitroActive: boolean,
  parachute: number,
  oxygen: number,
  harnessHP: number,
  // Only gets used by update data
  // armed: boolean,
  speed: number,
  engine: number,
  // Dont think this gets used
  // cinematic: number,
  // dev: boolean,
  show: boolean,
  // Only gets used by update data
  // talking: boolean,
  showVoice:boolean,
  showHealth: boolean,
  showArmor:boolean,
  showHunger:boolean,
  showThirst:boolean,
  showNos:boolean,
  showStress:boolean,
  showOxygen: boolean,
  showArmed:boolean,
  showEngine: boolean,
  showCruise: boolean,
  showHarness: boolean,
  showParachute: boolean,
  showDev: boolean,
  voiceIcon: IconDefinition,
  talkingColor: string,
  nosColor: string,
  engineColor: string,
  armorColor: string,
  hungerColor: string,
  healthColor: string,
  thirstColor: string,
  stressColor: string,
  oxygenColor: string,
  armedColor: string,
  parachuteColor: string,
  harnessColor: string,
  cruiseColor: string,
  devColor: string,
};

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
	const playerHudState: playerHudType = {
    nos: 0,
    // Used as a dummy variable
    static: 100,
    health: 0,
    armor: 0,
    hunger: 0,
    thirst: 0,
    stress: 0,
    voice: 0,
    parachute: 0,
    oxygen: 0,
    harnessHP: 0,
    speed: 0,
    engine: 0,
    // Dont think this gets used
    // cinematic: 0,
    show: false,
    showVoice: true,
    showHealth: false,
    showArmor: true,
    showHunger: true,
    showThirst: true,
    showNos: true,
    showStress: true,
    showOxygen: false,
    showArmed: true,
    showEngine: false,
    showCruise: false,
    showHarness: false,
    showParachute: false,
    showDev: false,
    voiceIcon: faMicrophone,

    talkingColor: "#FFFFFF",
    healthColor: "rgb(33, 171, 97)",
    armorColor: "#326dbf",
    hungerColor: "#dd6e14",
    thirstColor: "#1a7cad",
    stressColor: "rgb(220, 6, 6)",
    oxygenColor: "rgb(138, 168, 189)",
    armedColor: "rgb(255, 72, 133)",
    parachuteColor: "rgb(185, 255, 40)",
    engineColor: "#3FA554",
    harnessColor: "rgb(182, 72, 255)",
    cruiseColor: "rgb(255, 72, 133)",
    nosColor: "#D64763",
    devColor: "rgb(0, 0, 0)",
	}
	
  const { subscribe, set, update } = writable(playerHudState);

  const methods = {
    updatePlayerHud(data: playerHudUpdateMessageType) {
      update(state => {
        state.show = data.show;
        state.health = data.health;
        state.armor = data.armor;
        state.thirst = data.thirst;
        state.hunger = data.hunger;
        state.stress = data.stress;
        state.voice = data.voice;
        state.oxygen = data.oxygen;
        state.parachute = data.parachute;
        state.nos = data.nos;
        state.harnessHP = data.hp*5; // I am guessing harness hp max is 20?
        state.speed = data.speed;
        state.engine = data.engine;
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
            state.showHealth = false; 
          }
          else {
            state.showHealth = true;
          }
        } else {
          state.showHealth = true;
        }

        if (data.playerDead == false) {
          state.healthColor = "#3FA554";
        } else {
          state.healthColor = "#ff0000";
          state.health = 100;
        }
  
        if (data.dynamicArmor == true) {
          if (data.armor == 0) {
            state.showArmor = false; 
          } else {
            state.showArmor = true;
          }
        } else {
          state.showArmor = true;
        } 
  
        if (data.armor <= 0) {
          state.armorColor = "#FF0000";
        } else {
          state.armorColor = "#326dbf";
        }
  
        if (data.dynamicHunger == true) {
          if (data.hunger >= 100) {
            state.showHunger = false;
          } else {
            state.showHunger = true;
          }
        } else {
          state.showHunger = true;
        } 

        if (data.hunger >= 100) {
          state.hungerColor = "#dd6e14";
        } else if(data.hunger <= 30){
          state.hungerColor = "#ff0000";
        } else {
          state.hungerColor = "#dd6e14";
        }
  
        if (data.dynamicThirst == true) {
          if (data.thirst >= 100) {
            state.showThirst = false;
          } else{
            state.showThirst = true;
          }
        } else {
          state.showThirst = true;
        } 

        if (data.thirst >= 100) {
          state.thirstColor = "#1a7cad";
        } else if(data.thirst <= 30){
          state.thirstColor = "#ff0000";
        } else{
          state.thirstColor = "#1a7cad";
        }
  
        if (data.dynamicStress == true) {
          if (data.stress == 0) {
            state.showStress = false; 
          } else {
            state.showStress = true;
          }
        } else {
          state.showStress = true;
        } 
  
        if (data.dynamicOxygen == true) {
          if (data.oxygen >= 100) {
            state.showOxygen = false;
          } else {
            state.showOxygen = true;
          }
        } else {
          state.showOxygen = true;
        } 
  
        if (data.dynamicEngine == true) {
          if (data.engine >= 95) {
            state.showEngine = false; 
          } else if (data.engine < 0){
            state.showEngine = false;
          } else {
            state.showEngine = true;
          }
        } else {
          if (data.engine < 0) {
            state.showEngine = false;
          } else {
            state.showEngine = true;
          }
        } 

        if (data.engine <= 45) {
          state.engineColor = "#ff0000";
        } else if (data.engine <= 75 && data.engine >= 46 ) {
          state.engineColor = "#dd6e14";
        } else if(data.engine <= 100) {
          state.engineColor = "#3FA554";
        } 
  
        if (data.dynamicNitro == true) {
          // Dont know why this would be undefined?
          if (data.nos <= 0 || data.nos == undefined) {
            state.showNos = false;
          } else {
            state.showNos = true;
          }  
        } else {
          if (data.nos <= 0) {
            state.showNos = false;
          } else {
            state.showNos = true;
          }
        }

        if (data.nitroActive) {
          state.nosColor = "#D64763";
        } else {
          state.nosColor = "#FFFFFF";
        }
  
        if (data.talking && data.radio) {
          state.talkingColor = "#D64763";
        } else if (data.talking) {
          state.talkingColor = '#FFFF3E';
        } else {
          state.talkingColor = "#FFFFFF";
        }

        // Dont know why this would be undefined?
        if (data.radio != 0 && data.radio != undefined) {
          state.voiceIcon = faHeadset;
        // Dont know why this would be undefined?
        } else if (data.radio == 0 || data.radio == undefined) {
          state.voiceIcon = faMicrophone;
        }

        if (data.cruise == true) {
          state.showCruise = true;
        } else {
          state.showCruise = false;
        }
  
        if (data.harness == true) {
          state.showHarness = true;
        } else {
          state.showHarness = false;
        }
        
        if (data.armed == true) {
          state.showArmed = true;
        } else {
          state.showArmed = false;
        }
  
        if (data.parachute >= 0 ) {
          state.showParachute = true;
        } else {
          state.showParachute = false;
        }
  
        if (data.dev == true ) {
          state.showDev = true;
        } else {
          state.showDev = false;
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