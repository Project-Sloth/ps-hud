import { onMount, onDestroy } from "svelte";
import { get } from 'svelte/store';
import CompassHudStore from '../stores/compassHudStore';
import MenuStore from '../stores/menuStore';
import MoneyHudStore from '../stores/moneyHudStore';
import PlayerHudStore from '../stores/playerStatusHudStore';
import ExternalStatusStore from "../stores/externalStatusStore";
import LayoutStore from '../stores/layoutStore';
import VehicleHudStore from '../stores/vehicleHudStore';
import ColorEffectStore from '../stores/colorEffectStore';
import layoutStore from "../stores/layoutStore";

interface nuiMessage {
  data: {
    action: string,
    topic?: string,
    [key: string]: any,
  },
}

export function EventHandler() {
  function mainEvent(event: nuiMessage) {
    switch (event.data.action) {
      case "adminstatus":
        MenuStore.receiveAdminMessage(event.data as any);
      case "baseplate":
        CompassHudStore.receiveCompassMessage(event.data as any);
        break;
      case "car":
        switch (event.data.topic) {
          case "display":
            VehicleHudStore.recieveShowMessage(event.data as any);
            break;
          case "status":
            VehicleHudStore.receiveUpdateMessage(event.data as any);
          break;
        }
        break;
      case "externalstatus":
        switch (event.data.topic) {
          case "buff":
            ExternalStatusStore.receiveBuffStatusMessage(event.data as any);
            break;
          case "enhancement":
            ExternalStatusStore.receiveEnhancementStatusMessage(event.data as any);
            break;
        }
        break;
      case "hudtick":
        switch (event.data.topic) {
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
        MenuStore.receiveMessage();
        break;
      case "show":
        MoneyHudStore.receiveShowAccountsMessage(event.data as any);
        break;
      case "showconstant":
        MoneyHudStore.receiveShowConstantMessage(event.data as any);
        break;
      case "update":
        CompassHudStore.receiveHeadingMessage(event.data as any);
        break;
      case "updatemoney":
        MoneyHudStore.receiveUpdateMessage(event.data as any);
        break;
      case "updateUISettings":
        if (!event.data.icons || !event.data.layout) {
          return;
        }
        PlayerHudStore.receiveUIUpdateMessage(event.data);
        LayoutStore.receiveUIUpdateMessage(event.data);
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
  const playerStatusIcondata = get(PlayerHudStore);
  const layoutdata = get(layoutStore);
  const colorData = get(ColorEffectStore);
  const serializedIconData = combineIconColorData(playerStatusIcondata.icons, colorData);
  const sendData = {icons: serializedIconData, layout: layoutdata.layout};
  fetchNui('saveUISettings', sendData);
}