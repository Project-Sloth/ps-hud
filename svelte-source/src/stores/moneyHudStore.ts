import { writable } from 'svelte/store'

type moneyStatus = {
  cash: number,
  bank: number,
  amount: number,
  plus: boolean,
  minus: boolean,
  showCash: boolean,
  showBank: boolean,
  showUpdate: boolean
}

type moneyType = "cash" | "bank";

type moneyShowConstantMessage = {
  cash: number,
  bank: number,
}
type moneyUpdateMessage = {
  amount: number,
  bank: number,
  cash: number,
  minus: boolean,
  plus: boolean,
  type: moneyType,
}
type moneyShowAccountsMessage = {
  type: moneyType,
  cash: number,
  bank: number,
}

const store = () => {

  const moneyStatusState: moneyStatus = {
    cash: 0,
    bank: 0,
    amount: 0,
    plus: false,
    minus: false,
    showCash: false,
    showBank: false,
    showUpdate: false,
  }

  const { subscribe, set, update } = writable(moneyStatusState);

  const methods = {
    finishShowingUpdate() {
      update(state => {
        state.showUpdate = false;
        return state;
      });
    },
    finishShowingMoney(type: moneyType) {
      update(state => {
        if (type == "cash") {
          state.showCash = false;
        } else {
          state.showBank = false;
        }
        return state;
      });
    },
    formatMoney(value: number) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    receiveShowConstantMessage(data: moneyShowConstantMessage) {
      update(state => {
        state.showCash = true;
        state.showBank = true;
        state.cash = data.cash;
        state.bank = data.bank;

        return state;
      });
    },
    receiveUpdateMessage(data: moneyUpdateMessage) {
      update(state => {
        state.showUpdate = true;
        state.amount = data.amount;
        state.bank = data.bank;
        state.cash = data.cash;
        state.minus = data.minus;
        state.plus = !data.minus;

        if (data.type == "cash") {
          state.showCash = true;
        } else if (data.type == "bank") {
          state.showBank = true;
        }
        setTimeout(() => methods.finishShowingUpdate(), 3000);
        setTimeout(() => methods.finishShowingMoney(data.type), 4000);

        return state;
      });
    },
    receiveShowAccountsMessage(data: moneyShowAccountsMessage) {
      update(state => {
        if (data.type == "cash" && !state.showCash) {
          state.showCash = true;
          state.cash = data.cash;
        } else if (data.type == "bank" && !state.showBank) {
          state.showBank = true;
          state.bank = data.bank;
        }
        setTimeout(() => methods.finishShowingMoney(data.type), 3500);
        
        return state;
      });
    },
  }


  return {
    subscribe,
    set,
    update,
    ...methods
  };
}

export default store();