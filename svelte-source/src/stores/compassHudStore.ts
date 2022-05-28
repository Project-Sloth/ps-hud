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
type headingHudUpdateMessage = { value: number } // TODO change to heading

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
        state.showCompass = data.showCompass;
        state.street1 = data.street1;
        state.street2 = data.street2;
        state.showStreets = data.showStreets;
        state.showPointer = data.showPointer;
        state.showDegress = data.showDegress;

        return state;
      });
    },
    receiveCompassCloseMessage(data: Partial<compassHudUpdateMessage>) {
      update(state => {
        state.show = data.show;
        return state;
      })
    },
    receiveCompassOpenMessage(data: Partial<compassHudUpdateMessage>) {
      update(state => {
        state.show = data.show;
        state.showCompass = data.showCompass;
        return state;
      })
    },
    receiveHeadingMessage(data: headingHudUpdateMessage) {
      update(state => {
        state.heading = data.value-90;
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