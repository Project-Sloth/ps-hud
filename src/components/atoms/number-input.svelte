<script lang="ts">
  export let min: number = 0;
  export let max: number = 10;
  export let handleUpdateFunction: (val) => void = (_) => {};
  export let value: number = 1;
  export let step: number = 1;

  function checkConstraints(val: number) {
    if (val > max) {
      val = max;
    }
    if (val < min) {
      val = min;
    }
    return Math.round(val * 100) / 100;
  }

  function handleClick(op: "increase" | "decrease") {
    if (op == "increase") {
      value += step;
    } else {
      value -= step;
    }
    value = checkConstraints(value);
    handleUpdateFunction(value);
  }

  function handleInputUpdate(e: any) {
    if (e.target.value.endsWith(".")) {
      return;
    }
    let tempVal = Number(e.target.value);
    if (isNaN(tempVal)) {
      return;
    }
    value = checkConstraints(tempVal);
    handleUpdateFunction(value);
  }
</script>


<div  class="flex flex-row mx-auto border h-10 w-30 rounded-lg border-gray-600 relative text-black">
  <button class="font-semibold border-r bg-[#292929] hover:bg-red-600 text-white border-gray-600 border-1 h-full w-20 flex rounded-l-md focus:outline-none cursor-pointer"
    on:click={() => handleClick("decrease")}>
    <span class="mx-auto text-lg font-bold">-</span>
  </button>

  <input type="text" class="w-15 p-2 p-1 text-xs appearance-none text-base border-gray-600 border-1 focus:outline-none focus:border-1 focus:border-gray-400 text-center bg-[#292929] text-white"
    bind:value={value} on:input={(e) => handleInputUpdate(e)}/>
  
  <button class="font-semibold border-l bg-[#292929] hover:bg-green-600 text-white border-gray-600 border-1 h-full w-20 flex rounded-r-md focus:outline-none cursor-pointer"
    on:click={() => handleClick("increase")}>
    <span class="mx-auto text-lg font-bold">+</span>
  </button>
</div>

<!-- <div class="flex flex-row justify-center">
  <div class="quantity text-white">
    <input type="text" min={min} max={max} step="any" bind:value={value} on:input={(e) => handleInputUpdate(e)}
      class="bg-[#292929]">
    <div class="quantity-nav">
      <div class="quantity-button quantity-up" on:click={() => handleClick("increase")}>
        <span class="text-white">+</span>
      </div>
      <div class="quantity-button quantity-down" on:click={() => handleClick("decrease")}>
        <span class="text-white">-</span>
      </div>
    </div>
  </div>
</div>

<style>
.quantity input {
  width: 100px;
  height: 42px;
  line-height: 1.65;
  float: left;
  display: block;
  padding: 0;
  margin: 0;
  padding-left: 20px;
  border: 1px solid #eee;
}

.quantity input:focus {
  outline: 0;
}

.quantity-nav {
  float: left;
  position: relative;
  height: 42px;
}

.quantity-button {
  position: relative;
  cursor: pointer;
  border-left: 1px solid #eee;
  width: 20px;
  text-align: center;
  color: #333;
  font-size: 13px;
  font-family: "Trebuchet MS", Helvetica, sans-serif !important;
  line-height: 1.7;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  -webkit-user-select: none;
  user-select: none;
}

.quantity-button.quantity-up {
  position: absolute;
  height: 50%;
  top: 0;
  border-bottom: 1px solid #eee;
}

.quantity-button.quantity-down {
  position: absolute;
  bottom: -1px;
  height: 50%;
}
</style> -->