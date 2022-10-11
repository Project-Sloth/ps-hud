import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { capAmountToHundred } from '../types/types'

type vehicleStatusType = {
  fuelColor: Writable<string>,
  altitude: Writable<number>,
  fuel: Writable<number>,
  speed: Writable<number>,
  show: Writable<boolean>,
  showAltitude: Writable<boolean>,
  showSeatBelt: Writable<boolean>,
  showSquare: Writable<boolean>,
  showSquareBorder: Writable<boolean>,
  ShowCircle: Writable<boolean>,
  showCircleBorder: Writable<boolean>,
  seatbeltColor: Writable<string>,
  speedometerText: Writable<string>,
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
    fuelColor: writable("#FFFFFF"),
    altitude: writable(0),
    fuel: writable(0),
    speed: writable(0),
    show: writable(false),
    showAltitude: writable(false),
    showSeatBelt: writable(false),
    showSquare: writable(false),
    showSquareBorder: writable(false),
    ShowCircle: writable(false),
    showCircleBorder: writable(false),
    seatbeltColor: writable("#e85b14"),
    speedometerText: writable("MPH"),
  }

  const methods = {
    receiveShowMessage(data: vehicleHudShowMessage) {
      vehicleStatusState.show.set(data.show);
      vehicleStatusState.showSeatBelt.set(data.seatbelt);
    },
    receiveUpdateMessage(data: vehicleHudUpdateMessageType) {
      let newShow: boolean = data.show;
      if (data.isPaused) {
        newShow = false;
      }
      vehicleStatusState.show.set(newShow);
      vehicleStatusState.speed.set(data.speed);
      vehicleStatusState.altitude.set(data.altitude);
      vehicleStatusState.fuel.set(capAmountToHundred(data.fuel));
      vehicleStatusState.showSeatBelt.set(data.showSeatbelt);
      vehicleStatusState.showAltitude.set(data.showAltitude);
      vehicleStatusState.showSquareBorder.set(data.showSquareB);
      vehicleStatusState.showCircleBorder.set(data.showCircleB);
      vehicleStatusState.showSeatBelt.set(!data.seatbelt);

      let newFuelColor: string = "#FFFFFF";
      if (data.fuel <= 20) {
        newFuelColor = "#ff0000";
      } else if (data.fuel <= 30) {
        newFuelColor = "#dd6e14";
      } else {
        newFuelColor = "#FFFFFF";
      }
      vehicleStatusState.fuelColor.set(newFuelColor);
    }
  }

  return {
    ...vehicleStatusState,
    ...methods
  }
}

export default store();