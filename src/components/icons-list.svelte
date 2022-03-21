<script lang="ts">
  import PlayerHudStore from '../stores/playerHudStore';
  import { fade } from 'svelte/transition';
  import type { shapeType } from '../types/types';
  import { onDestroy } from 'svelte';
  import { faHeart, faShieldAlt, faHamburger, faTint, faBrain, faStream,
    faParachuteBox, faMeteor, faLungs, faOilCan, faUserSlash,
    faTachometerAltFast, faTerminal,
  } from '@fortawesome/free-solid-svg-icons'
  import MetaShape from './meta-shape.svelte';

  export let isReversed: boolean = false;

  let height: number = 65;
  let width: number = 65;
  let stroke: number = 0.5;
  let shape: shapeType['shape'] = "diamond-ring"
  let rotate: number = 0;
  let translateX: number = 0;
  let translateY: number = 0;
  let iconScaling: number = 0.30;
  let iconColor: string = "white";
  let iconTranslateX: number = 0;
  let iconTranslateY: number = 0;

  let iconList: Array<shapeType> = [];
  $: {
    iconList = [
      { 
        'progressColor': $PlayerHudStore.talkingColor,    'icon': $PlayerHudStore.voiceIcon,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.voice,           'ifShowing': $PlayerHudStore.showVoice,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.healthColor,     'icon': faHeart,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.health,          'ifShowing': $PlayerHudStore.showHealth,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.armorColor,      'icon': faShieldAlt,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.armor,           'ifShowing': $PlayerHudStore.showArmor,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.hungerColor,     'icon': faHamburger,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.hunger,          'ifShowing': $PlayerHudStore.showHunger,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.thirstColor,     'icon': faTint,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.thirst,          'ifShowing': $PlayerHudStore.showThirst,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.stressColor,     'icon': faBrain,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.stress,          'ifShowing': $PlayerHudStore.showStress,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.oxygenColor,     'icon': faLungs,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.oxygen,          'ifShowing': $PlayerHudStore.showOxygen,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.armedColor,      'icon': faStream,
        'height': height,                                 'width': width,
        'progressValue': 0,                               'ifShowing': $PlayerHudStore.showArmed,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.parachuteColor,  'icon': faParachuteBox,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.parachute,       'ifShowing': $PlayerHudStore.showParachute,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.engineColor,     'icon': faOilCan,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.engine,          'ifShowing': $PlayerHudStore.showEngine,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.harnessColor,    'icon': faUserSlash,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.harnessHP,       'ifShowing': $PlayerHudStore.showHarness,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.cruiseColor,     'icon': faTachometerAltFast,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.speed,           'ifShowing': $PlayerHudStore.showCruise,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.nosColor,        'icon': faMeteor,
        'height': height,                                 'width': width,
        'progressValue': $PlayerHudStore.nos,             'ifShowing': $PlayerHudStore.showNos,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },{ 
        'progressColor': $PlayerHudStore.devColor,        'icon': faTerminal,
        'height': height,                                 'width': width,
        'progressValue': 0,                               'ifShowing': $PlayerHudStore.showDev,
        'ringSize': stroke,                               'shape': shape,
        'innerColor': "",                                 'rotateDegree': rotate,
        'translateX': translateX,                         'translateY': translateY,
        'iconScaling': iconScaling,                       'iconColor': iconColor,
        'iconTranslateX': iconTranslateX,                 'iconTranslateY': iconTranslateY,
      },
    ]

    if (isReversed) {
      iconList.reverse();
    }
  }

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

</script>

{#each iconList as shapeInfo }
  {#if shapeInfo.ifShowing || true}
    <div transition:fade="{{duration: 1000}}" class="my-auto">
      <MetaShape shapeInfo={{...shapeInfo, progressValue: num }} />
    </div>
  {/if}
{/each}