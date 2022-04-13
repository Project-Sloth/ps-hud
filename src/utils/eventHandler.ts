import { onMount, onDestroy } from "svelte";
import CompassHudStore from '../stores/compassHudStore';
import MenuStore from '../stores/menuStore';
import MoneyHudStore from '../stores/moneyHudStore';
import PlayerHudStore from '../stores/playerStatusHudStore';
import VehicleHudStore from "../stores/vehicleHudStore"


interface nuiMessage {
  data: any,
}

export function EventHandler() {
  function mainEvent(event: nuiMessage) {
    switch(event.data.action) {
      case "baseplate":
        console.log("Updaing compass stuff (street, degrees, pointer) TICK!!!", event);
        CompassHudStore.receiveCompassMessage(event.data);
        break;
      case "car":
        console.log("Car/Vehicle TICK!!", event);
        VehicleHudStore.receiveMessage(event.data);
        break;
      case "hudtick":
        console.log("HUDTICK!!:", event);
        PlayerHudStore.receiveMessage(event.data);
        break;
      case "open":
        console.log("OPEN TICK!!", event);
        MenuStore.receiveMessage();
        break;
      case "show":
        console.log("SHOW TICK!!!", event);
        MoneyHudStore.receiveShowAccountsMessage(event.data);
        break;
      case "showconstant":
        console.log("ShowConstant TICK!!!", event);
        MoneyHudStore.receiveShowConstantMessage(event.data);
        break;
      case "update":
        console.log("Updating Heading!", event);
        CompassHudStore.receiveHeadingMessage(event.data);
        break;
      case "updatemoney":
        console.log("Updating Money!!!", event);
        MoneyHudStore.receiveUpdateMessage(event.data);
        break;
      default:
        console.log("Uncaught received message!!!", event);
        break;
    }
  }

  onMount(() => window.addEventListener("message", mainEvent));
  onDestroy(() => window.removeEventListener("message", mainEvent));
}

export async function fetchNui(eventName: string, data: unknown = {}) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  // const resourceName = (window as any).GetParentResourceName
  //   ? (window as any).GetParentResourceName()
  //   : "nui-frame-app";

  const resourceName = "qb-hud";

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  return await resp.json();
}

export function debugProgress() {
}