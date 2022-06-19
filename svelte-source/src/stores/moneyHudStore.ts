import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store';

type moneyStatus = {
  currencyText: Writable<string>,
  cash: Writable<number>,
  bank: Writable<number>,
  amount: Writable<number>,
  plus: Writable<boolean>,
  minus: Writable<boolean>,
  showCash: Writable<boolean>,
  showBank: Writable<boolean>,
  showUpdate: Writable<boolean>,
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
    currencyText: writable("$"),
    cash: writable(0),
    bank: writable(0),
    amount: writable(0),
    plus: writable(false),
    minus: writable(false),
    showCash: writable(false),
    showBank: writable(false),
    showUpdate: writable(false),
  }

  const methods = {
    finishShowingUpdate() {
      moneyStatusState.showUpdate.set(false);
    },
    finishShowingMoney(type: moneyType) {
      if (type == "cash") {
        moneyStatusState.showCash.set(false);
      } else {
        moneyStatusState.showBank.set(false);
      }
    },
    receiveShowConstantMessage(data: moneyShowConstantMessage) {
      moneyStatusState.showCash.set(true);
      moneyStatusState.showBank.set(true);
      moneyStatusState.cash.set(data.cash);
      moneyStatusState.bank.set(data.bank);
    },
    receiveUpdateMessage(data: moneyUpdateMessage) {
      moneyStatusState.showUpdate.set(true);
      moneyStatusState.amount.set(data.amount);
      moneyStatusState.bank.set(data.bank);
      moneyStatusState.cash.set(data.cash);
      moneyStatusState.minus.set(data.minus);
      moneyStatusState.plus.set(!data.minus);

      if (data.type == "cash") {
        moneyStatusState.showCash.set(true);
      } else if (data.type == "bank") {
        moneyStatusState.showBank.set(true);
      }
      setTimeout(() => methods.finishShowingUpdate(), 3000);
      setTimeout(() => methods.finishShowingMoney(data.type), 4000);
    },
    receiveShowAccountsMessage(data: moneyShowAccountsMessage) {
      moneyStatusState.showCash.update((showCash) => {
        if (data.type == "cash" && !showCash) {
          showCash = true;
          moneyStatusState.cash.set(data.cash);
        }
        return showCash;
      });
      moneyStatusState.showBank.update((showBank) => {
        if (data.type == "bank" && !showBank) {
          showBank = true;
          moneyStatusState.bank.set(data.bank);
        }
        return showBank;
      });
      setTimeout(() => methods.finishShowingMoney(data.type), 3500);
    },
  }


  return {
    ...moneyStatusState,
    ...methods
  };
}

export default store();