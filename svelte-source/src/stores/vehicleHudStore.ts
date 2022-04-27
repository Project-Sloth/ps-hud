import { writable } from 'svelte/store'

type vehicleStatusType = {
  speedometer: number,
  fuelColor: string,
  fuelguage: number,
  altitude: number,
  // this is only used for showing the circle gauge 75% of a circle
  altitudegauge: number,
  fuel: number,
  speed: number,
  show: boolean,
  showAltitude: boolean,
  showSeatBelt: boolean,
  showSquare: boolean,
  showSquareBorder: boolean,
  ShowCircle: boolean,
  showCircleBorder: boolean,
  seatbeltColor: string,
}

type vehicleHudUpdateMessageType = {
  show: boolean,
  isPaused: boolean,
  seatbelt: boolean,
  speed: number,
  fuel: number,
  altitude: number,
  showAltitude: boolean,
  showSeatbelt: boolean,
  showSquareB: boolean,
  showCircleB: boolean, 
}

type vehicleHudShowMessage = {
  show: boolean,
  seatbelt: boolean,
}


const store = () => {

  const vehicleStatusState: vehicleStatusType = {
    speedometer: 66, // Used for htmll value, dont need to be sent this
    fuelColor: "#FFFFFF",
    fuelguage: 69, // Used for html value, dont need to be sent this
    altitude: 0,
    altitudegauge: 75, // Used for html value, dont need to be sent this
    fuel: 0,
    speed: 0,
    show: false,
    showAltitude: false,
    showSeatBelt: false,
    showSquare: false,
    showSquareBorder: false,
    ShowCircle: false,
    showCircleBorder: false,
    seatbeltColor: "",
  }

  const { subscribe, set, update } = writable(vehicleStatusState);

  const methods = {
    recieveShowMessage(data: vehicleHudShowMessage) {
      update(state => {
        state.show = data.show;
        state.showSeatBelt = data.seatbelt;
        if (data.seatbelt) {
          state.seatbeltColor = "transparent";
        } else {
          state.seatbeltColor = "#FF5100";
        }
        return state;
      })
    },
    receiveUpdateMessage(data: vehicleHudUpdateMessageType) {
      update(state => {
        // console.log("vehicle message:", data);
        state.show = data.show;
        state.speed = data.speed;
        state.altitude = data.altitude;
        state.fuel = data.fuel * 0.71;
        state.showSeatBelt = data.showSeatbelt;
        state.showAltitude = data.showAltitude;
        state.showSquareBorder = data.showSquareB;
        state.showCircleBorder = data.showCircleB;

        if (data.seatbelt) {
          state.seatbeltColor = "transparent";
        } else {
          state.seatbeltColor = "#FF5100";
        }

        if (data.fuel <= 20) {
          state.fuelColor = "#ff0000";
        } else if (data.fuel <= 30) {
          state.fuelColor = "#dd6e14";
        } else {
          state.fuelColor = "#FFFFFF";
        }

        if (data.isPaused) {
          state.show = false;
        }

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