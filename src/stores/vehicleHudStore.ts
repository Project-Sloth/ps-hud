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
  seatbeat: number,
  show: boolean,
  showAltitude: boolean,
  showSeatBelt: boolean,
  showSquare: boolean,
  showSquareBorder: boolean,
  ShowCircle: boolean,
  showCircleBorder: boolean,
  seatbeltColor: string,
}
//   action: string,
type vehicleHudUpdateMessageType = {
  show: boolean,
  isPaused: boolean,
  seatbelt: boolean,
  speed: number,
  fuel: number,
  altitude: number,
  showAltitude: boolean,
  showSeatbelt: boolean,
  showSquareBorder: boolean,
  showCircleBorder: boolean,
  
}

const store = () => {

  const vehicleStatusState: vehicleStatusType = {
    speedometer: 66,
    fuelColor: "#FFFFFF",
    fuelguage: 69,
    altitude: 0,
    altitudegauge: 75,
    fuel: 0,
    speed: 0,
    seatbeat: 0,
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
    receiveMessage(data: vehicleHudUpdateMessageType) {
      update(state => {
        state.show = data.show;
        state.speed = data.speed;
        state.altitude = data.altitude;
        state.fuel = data.fuel * 0.71;
        state.showSeatBelt = data.showSeatbelt;
        state.showAltitude = data.showAltitude;
        state.showSquareBorder = data.showSquareBorder;
        state.showCircleBorder = data.showCircleBorder;

        if (data.seatbelt) {
          state.seatbeat = 100;
          state.seatbeltColor = "transparent";
        } else {
          state.seatbeat = 0;
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