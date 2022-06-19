<script lang="ts">
  import { fade } from 'svelte/transition';
  import MoneyHudStore from '../stores/moneyHudStore'

  let { amount, bank, cash, currencyText, minus, plus, showCash, showBank, showUpdate } = MoneyHudStore;
</script>

<div id="money-container">
  {#if $showCash}
    <div transition:fade|local="{{duration: 1000}}">
      <p><span id="sign">{$currencyText}&nbsp;</span><span id="money">{$cash}</span></p>
    </div>
  {/if}
  {#if $showBank}
    <div transition:fade|local="{{duration: 1000}}">
      <p><span id="sign">{$currencyText}&nbsp;</span><span id="bank">{$bank}</span></p>
    </div>
  {/if}
  {#if $showUpdate}
    <div transition:fade|local="{{duration: 1000}}">
      {#if $plus}
        <p id="money"><span id="plus">+&nbsp;</span><span id="money">{$amount}</span></p>
      {:else if $minus}
        <p id="minus"><span id="minus">-&nbsp;</span><span id="money">{$amount}</span></p>
      {/if}
    </div>
  {/if}
</div>

<style>
  #money-container {
    position: absolute;
    right: 2vw;
    top: 5vh;
    font-weight: 400;
    font-size: 40px;
  }

  #sign, #bank {
    font-family: 'Pricedown Bl', sans-serif;
    text-align: right;
    color: #00ac31;
    text-shadow: -1px -1px 0 rgba(0,0,0, 0.7), 1px -1px 0 rgba(0,0,0, 0.7), -1px 1px 0 rgba(0,0,0, 0.7), 1px 1px 0 rgba(0,0,0, 0.7);
  }

  #plus {
    font-size: 50px;
    font-family: 'Pricedown Bl', sans-serif;
    text-align: right;
    color: #00ac31;
    text-shadow: -1px -1px 0 rgba(0,0,0, 0.7), 1px -1px 0 rgba(0,0,0, 0.7), -1px 1px 0 rgba(0,0,0, 0.7), 1px 1px 0 rgba(0,0,0, 0.7);
  }

  #minus {
    font-size: 50px;
    font-family: 'Pricedown Bl', sans-serif;
    text-align: right;
    color: #ac0000;
    text-shadow: -1px -1px 0 rgba(0,0,0, 0.7), 1px -1px 0 rgba(0,0,0, 0.7), -1px 1px 0 rgba(0,0,0, 0.7), 1px 1px 0 rgba(0,0,0, 0.7);
  }

  #money {
    font-family: 'Pricedown Bl', sans-serif;
    text-align: right;
    color: #ffffff;
    text-shadow: -1px -1px 0 rgba(0,0,0, 0.7), 1px -1px 0 rgba(0,0,0, 0.7), -1px 1px 0 rgba(0,0,0, 0.7), 1px 1px 0 rgba(0,0,0, 0.7);
  }
</style>