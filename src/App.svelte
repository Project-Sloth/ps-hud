<script lang="ts">
  import Circle from './components/circle.svelte';
  import Square from './components/square.svelte';
  import Star from './components/star.svelte'
  import Triangle from './components/triangle.svelte';
  import Hexagon from './components/hexagon.svelte';
  import Octagon from './components/octagon.svelte';
  import Burger from './components/burger.svelte';
  import Diamond from './components/diamond.svelte';
  import CircleWhole from './components/circleWhole.svelte';
  import { onDestroy } from 'svelte';
  import PlayerHudStore from './stores/playerHudStore';
  import { fade } from 'svelte/transition';
  import { faHeart, faShieldAlt, faHamburger, faTint, faBrain, faStream,
    faParachuteBox, faMeteor, faMicrophone, faLungs, faOilCan, faUserSlash,
    faTachometerAltFast, faTerminal, IconDefinition
  } from '@fortawesome/free-solid-svg-icons'

  let interval;

  let num: number = 0

  const moveProgress = () => {
    let isUp: boolean = true;
    interval = setInterval(() => {
      if (isUp) {
        num += 15
        if (num > 100) {
          num = 100;
          isUp = !isUp;
        }
      } else {
        num -= 15
        if (num < 0) {
          num = 0;
          isUp = !isUp;
        }
      }
    }, 1400);
  };

  moveProgress();
  onDestroy(() => clearInterval(interval));

  let iconList: Array<{color: string, icon: IconDefinition, value: number, ifShowing: boolean}> = [];

  $: {
    iconList = [{ 
        'color': $PlayerHudStore.talkingColor,   'icon': $PlayerHudStore.voiceIcon,
        'value': $PlayerHudStore.voice,          'ifShowing': $PlayerHudStore.showVoice
      },{ 
        'color': $PlayerHudStore.healthColor,    'icon': faHeart,
        'value': $PlayerHudStore.health,         'ifShowing': $PlayerHudStore.showHealth 
      },{ 
        'color': $PlayerHudStore.armorColor,     'icon': faShieldAlt,
        'value': $PlayerHudStore.armor,          'ifShowing': $PlayerHudStore.showArmor 
      },{ 
        'color': $PlayerHudStore.hungerColor,    'icon': faHamburger,
        'value': $PlayerHudStore.hunger,         'ifShowing': $PlayerHudStore.showHunger
      },{ 
        'color': $PlayerHudStore.thirstColor,    'icon': faTint,
        'value': $PlayerHudStore.thirst,         'ifShowing': $PlayerHudStore.showThirst
      },{ 
        'color': $PlayerHudStore.stressColor,    'icon': faBrain,
        'value': $PlayerHudStore.stress,         'ifShowing': $PlayerHudStore.showStress
      },{ 
        'color': $PlayerHudStore.oxygenColor,    'icon': faLungs,
        'value': $PlayerHudStore.oxygen,         'ifShowing': $PlayerHudStore.showOxygen
      },{ 
        'color': $PlayerHudStore.armedColor,     'icon': faStream,
        'value': 0,                              'ifShowing': $PlayerHudStore.showArmed
      },{ 
        'color': $PlayerHudStore.parachuteColor, 'icon': faParachuteBox,
        'value': $PlayerHudStore.parachute,      'ifShowing': $PlayerHudStore.showParachute
      },{ 
        'color': $PlayerHudStore.engineColor,    'icon': faOilCan,
        'value': $PlayerHudStore.engine,         'ifShowing': $PlayerHudStore.showEngine
      },{ 
        'color': $PlayerHudStore.harnessColor,   'icon': faUserSlash,
        'value': $PlayerHudStore.harnessHP,      'ifShowing': $PlayerHudStore.showHarness
      },{ 
        'color': $PlayerHudStore.cruiseColor,    'icon': faTachometerAltFast,
        'value': $PlayerHudStore.speed,          'ifShowing': $PlayerHudStore.showCruise
      },{ 
        'color': $PlayerHudStore.nosColor,       'icon': faMeteor,
        'value': $PlayerHudStore.nos,            'ifShowing': $PlayerHudStore.showNos
      },{ 
        'color': $PlayerHudStore.devColor,       'icon': faTerminal,
        'value': 0,                              'ifShowing': $PlayerHudStore.showDev
      },
    ]
  }
</script>

<main class="bg-white min-h-screen">
  <div class="absolute flex left-[1vh] bottom-[0.3vw] flex-row gap-2">
    {#if $PlayerHudStore.show || true}
      {#each iconList as {color, icon, value, ifShowing} }
        {#if ifShowing || true}
          <div transition:fade="{{duration: 1000}}">
            <Circle progress={num} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
          </div>
        {/if}
      {/each}
      {#each iconList as {color, icon, value, ifShowing} }
      {#if ifShowing || true}
        <div transition:fade="{{duration: 1000}}">
          <!-- <Square progress={num} icon={icon} progressColor={color} innerColor={"#403e3e"}/> -->
          <!-- <Star progress={num} icon={icon} progressColor={color} innerColor={"#403e3e"}/> -->
          <!-- <Triangle progress={num} icon={icon} progressColor={color} innerColor={"#403e3e"} leftOffSetIcon={icon == faMeteor ? 0.05 : 0} /> -->
          <!-- <Hexagon progress={num} icon={icon} progressColor={color} innerColor={"#403e3e"}/> -->
          <!-- <Diamond progress={num} icon={icon} progressColor={color} innerColor={"#403e3e"} leftOffSetIcon={icon == faMeteor ? 0.03 : 0} /> -->
          <CircleWhole progress={num} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
        </div>
      {/if}
    {/each}
    {/if}
  </div>
</main>

<!-- <main class="min-h-screen bg-dark-100 flex flex-col gap-3">
  <div class="">
    <div class="flex flex-row">
    {#each iconColorList as {color, icon} }
      <Circle progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
    </div>
  </div>
  <div class="">
    <div class="flex flex-row">
    {#each iconColorList as {color, icon} }
      <Square progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
    </div>
  </div>
  <div class="">
    <div class="flex flex-row">
      {#each iconColorList as {color, icon} }
        <Star progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
      {/each}
    </div>
  </div>
  <div class="flex flex-row">
    {#each iconColorList as {color, icon} }
      <Triangle progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
  </div>
  <div class="flex flex-row ml-1">
    {#each iconColorList as {color, icon} }
      <Diamond progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
  </div>



  <div class="mt-auto mb-3">
    <div class="flex flex-row">
      <div class="flex flex-col ml-2 mr-5">
        <div class="flex flex-row">
        <div class="flex flex-col gap-2">
          <Diamond progress={$progress} progressColor={armedStrokeColor} innerColor={"#403e3e"}/>
          <Diamond progress={$progress} progressColor={stressStrokeColor} innerColor={"#403e3e"}/>
          <Diamond progress={$progress} progressColor={hungerStrokeColor} innerColor={"#403e3e"}/>
          <Diamond progress={$progress} progressColor={healthStrokeColor} innerColor={"#403e3e"}/>
        </div>
        <div class="flex flex-col my-[-35px] mx-[-20px] gap-2">
          <Diamond progress={$progress} progressColor={nosStrokeColor} innerColor={"#403e3e"}/>
          <Diamond progress={$progress} progressColor={parachuteStrokeColor} innerColor={"#403e3e"}/>
          <Diamond progress={$progress} progressColor={thirstStrokeColor} innerColor={"#403e3e"}/>
          <Diamond progress={$progress} progressColor={armorStrokeColor} innerColor={"#403e3e"}/>
        </div>
        </div>
      </div>

      <div class="flex flex-col mt-auto">
        <div class="flex flex-row">
          <div class="flex flex-col mt-8">
            <Hexagon progress={$progress} icon={iconColorList[2].icon} innerColor={"#292626"}/>
            <Hexagon progress={$progress} icon={iconColorList[5].icon} innerColor={"#292626"}/>
          </div>
          <div class="mx-[-15px]">
            <Hexagon progress={$progress} icon={iconColorList[0].icon} innerColor={"#292626"}/>
            <Hexagon progress={$progress} icon={iconColorList[1].icon} innerColor={"#292626"}/>
          </div>
          <div class="flex flex-col mt-8">
            <Hexagon progress={$progress} icon={iconColorList[3].icon} innerColor={"#292626"}/>
            <Hexagon progress={$progress} icon={iconColorList[4].icon} innerColor={"#292626"}/>
          </div>
        </div>
      </div>

      <div class="flex flex-col mt-auto">
        <div class="flex flex-row">
          <div class="flex flex-col mt-8">
            <Hexagon progress={$progress} icon={iconColorList[2].icon} iconColor={"#dd6e14"} innerColor={"#292626"}/>
            <Hexagon progress={$progress} icon={iconColorList[5].icon} iconColor={iconColorList[5].color} innerColor={"#292626"}/>
          </div>
          <div class="mx-[-15px]">
            <Hexagon progress={$progress} icon={iconColorList[0].icon} innerColor={"#292626"}/>
            <Hexagon progress={$progress} icon={iconColorList[1].icon} innerColor={"#292626"}/>
          </div>
          <div class="flex flex-col mt-8">
            <Hexagon progress={$progress} icon={iconColorList[3].icon} innerColor={"#292626"}/>
            <Hexagon progress={$progress} icon={iconColorList[4].icon} innerColor={"#292626"}/>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex flex-row">
          <TriCircle innerColor={"#403e3e"}/>
        </div>
      </div>

    </div>
  </div>

</main> -->

