import { writable } from 'svelte/store'

type compassStatus = {
  heading: number,
  show: boolean,
  street1: string,
  street2: string,
  showCompass: boolean,
  showStreets: boolean,
  showPointer: boolean,
  showDegress: boolean,
}

type compassHudUpdateMessage = Omit<compassStatus, "heading" >;
type headingHudUpdateMessage = { heading: number }

const store = () => {
  const compassStatusState: compassStatus = {
    heading: 1,
    show: false,
    street1: "",
    street2: "",
    showCompass: true,
    showStreets: true,
    showPointer: true,
    showDegress: true,
  };

  const { subscribe, set, update } = writable(compassStatusState);

  const methods = {
    receiveCompassMessage(data: compassHudUpdateMessage) {
      update(state => {
        state.show = data.show;
        state.street1 = data.street1;
        state.street2 = data.street2;
        state.showCompass = data.showCompass;
        state.showStreets = data.showStreets;
        state.showPointer = data.showPointer;
        state.showDegress = data.showDegress;

        return state;
      });
    },
    receiveHeadingMessage(data: headingHudUpdateMessage) {
      update(state => {
        state.heading = data.heading;
        return state;
      });
    },
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  };
}

export default store();