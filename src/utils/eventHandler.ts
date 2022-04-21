import { onMount, onDestroy } from "svelte";
import { get } from 'svelte/store';
import CompassHudStore from '../stores/compassHudStore';
import MenuStore from '../stores/menuStore';
import MoneyHudStore from '../stores/moneyHudStore';
import PlayerHudStore from '../stores/playerStatusHudStore';
import VehicleHudStore from '../stores/vehicleHudStore';
import ColorEffectStore from '../stores/colorEffectStore';

interface nuiMessage {
  data: {
    action: string,
    topic?: string,
    [key: string]: any,
  },
}

export function EventHandler() {
  function mainEvent(event: nuiMessage) {
    switch(event.data.action) {
      case "adminstatus":
        MenuStore.receiveAdminMessage(event.data as any);
      case "baseplate":
        // console.log("Updaing compass stuff (street, degrees, pointer) TICK!!!", event);
        CompassHudStore.receiveCompassMessage(event.data as any);
        break;
      case "car":
        // console.log("Car/Vehicle TICK!!", event);
        VehicleHudStore.receiveMessage(event.data as any);
        break;
      case "hudtick":
        // console.log("HUDTICK!!:", event);
        switch(event.data.topic) {
          case "display":
            PlayerHudStore.receiveShowMessage(event.data as any);
            break;
          case "status":
            PlayerHudStore.receiveStatusUpdateMessage(event.data as any);
            break;
          default:
            PlayerHudStore.receiveStatusUpdateMessage(event.data as any);
            break;
        }
        break;
      case "open":
        // console.log("OPEN TICK!!", event);
        MenuStore.receiveMessage();
        break;
      case "show":
        // console.log("SHOW TICK!!!", event);
        MoneyHudStore.receiveShowAccountsMessage(event.data as any);
        break;
      case "showconstant":
        // console.log("ShowConstant TICK!!!", event);
        MoneyHudStore.receiveShowConstantMessage(event.data as any);
        break;
      case "update":
        // console.log("Updating Heading!", event);
        CompassHudStore.receiveHeadingMessage(event.data as any);
        break;
      case "updatemoney":
        // console.log("Updating Money!!!", event);
        MoneyHudStore.receiveUpdateMessage(event.data as any);
        break;
      case "updateUISettings":
        //console.log("Update message recieved!", event.data);
        PlayerHudStore.receiveUIUpdateMessage(event.data);
      // default:
        // console.log("Uncaught received message!!!", event);
        // break;
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

  try {
    const resp = await fetch(`https://${resourceName}/${eventName}`, options);
    return await resp.json();
  } catch(err) {
  }
}

function combineIconColorData(iconData, colorData) {
  let result = {};
  for(const [key, value] of Object.entries(iconData)) {
    let newObject = (({ displayOutline, icon, isShowing, name, progressValue, ...o }) => o)(value as any)
    result[key] = newObject;
    result[key].progressColor = colorData[key].colorEffects[0].color;
  }
  return result;
}

export function saveUIData() {
  const data = get(PlayerHudStore);
  const colorData = get(ColorEffectStore);
  const serializedIconData = combineIconColorData(data.icons, colorData);
  const sendData = {icons: serializedIconData, layout: data.layout};
  //console.log("Sending data:", sendData);
  fetchNui('saveUISettings', sendData);
}