<script lang="ts">
  import Circle from './components/circle.svelte';
  import Square from './components/square.svelte';
  import Star from './components/star.svelte'
  import Triangle from './components/triangle.svelte';
  import Heart from './components/heart.svelte';
  import Hexagon from './components/hexagon.svelte';
  import Octagon from './components/octagon.svelte';
  import Burger from './components/burger.svelte';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
  import { onDestroy } from 'svelte';
  import { faHeart, faShieldAlt, faHamburger, faTint, faBrain, faStream,
    faParachuteBox, faMeteor} from '@fortawesome/free-solid-svg-icons'

	const progress = tweened(0, {
		duration: 950,
		easing: cubicOut
	});
  let interval;

  onDestroy(() => clearInterval(interval));

  const moveProgress = () => {
    let num: number = 0
    let isUp: boolean = true;
    let resetTime: boolean = false;
    interval = setInterval(() => {
      let count: number = 0;
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
      if (!isUp && count%5==0) {
        progress.set(0)
        num = 0;
        isUp = true;
        count += 1;
      } else {
        progress.set(num)
      }
    }, 1400);
  };
  moveProgress();
  let talkColor = "stroke-[#FFFFFF]"
  let healthColor = "stroke-[#3FA554]"
  let armorColor = "stroke-[#326dbf]"
  let hungerColor = "stroke-[#dd6e14]"
  let thirstColor = "stroke-[#1a7cad]"
  let stressColor = "stroke-red-700"
  let nosColor = "stroke-[#D64763]"
  let armedColor = "stroke-[#ff4885]"
  let parachuteColor = "stroke-[#b648ff]"

  let iconColorList = [
    {'color': healthColor, 'icon': faHeart},
    {'color': armorColor, 'icon': faShieldAlt},
    {'color': hungerColor, 'icon': faHamburger},
    {'color': thirstColor, 'icon': faTint},
    {'color': stressColor, 'icon': faBrain},
    {'color': armedColor, 'icon': faStream},
    {'color': parachuteColor, 'icon': faParachuteBox},
    {'color': nosColor, 'icon': faMeteor},
  ]
// bg-dark-100
</script>
<main class="min-h-screen bg-dark-100">
  <div class="flex flex-row">
    {#each iconColorList as {color, icon} }
      <Circle progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
  </div>
  <div class="flex flex-row mb-1">
    {#each iconColorList as {color, icon} }
      <Square progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
  </div>
  <div class="flex flex-row">
    {#each iconColorList as {color, icon} }
      <Star progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
  </div>
  <div class="flex flex-row">
    {#each iconColorList as {color, icon} }
      <Triangle progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
  </div>
  <div class="flex flex-row">
    {#each iconColorList as {color, icon} }
      <Heart progress={$progress} icon={icon} progressColor={color} innerColor={"#403e3e"}/>
    {/each}
  </div>
  <div class="flex flex-row">
    {#each iconColorList as {icon} }
      <Hexagon progress={$progress} icon={icon} innerColor={"#292626"}/>
    {/each}
  </div>
  <div class="flex flex-row">
    <Octagon progress={$progress} />
  </div>
  <div class="flex flex-row">
    <Burger progress={$progress} progressColor={hungerColor}/>
  </div>
</main>

