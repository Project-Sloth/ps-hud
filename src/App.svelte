<script lang="ts">
  import Circle from './components/circle.svelte';
  import Square from './components/square.svelte';
  import Star from './components/star.svelte'
  import Triangle from './components/triangle.svelte';
  import TriCircle from './components/triCircle.svelte';
  import Hexagon from './components/hexagon.svelte';
  import Octagon from './components/octagon.svelte';
  import Burger from './components/burger.svelte';
  import Diamond from './components/diamond.svelte';
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
      progress.set(num)
    }, 1400);
  };
  moveProgress();
  let talkColor = "#FFFFFF"
  let healthColor = "#3FA554"
  let armorColor = "#326dbf"
  let hungerColor = "#dd6e14"
  let thirstColor = "#1a7cad"
  let stressColor = "stroke-red-700"
  let nosColor = "#D64763"
  let armedColor = "#ff4885"
  let parachuteColor = "#b648ff"

  let talkStrokeColor = "stroke-[#FFFFFF]"
  let healthStrokeColor = "stroke-[#3FA554]"
  let armorStrokeColor = "stroke-[#326dbf]"
  let hungerStrokeColor = "stroke-[#dd6e14]"
  let thirstStrokeColor = "stroke-[#1a7cad]"
  let stressStrokeColor = "stroke-red-700"
  let nosStrokeColor = "stroke-[#D64763]"
  let armedStrokeColor = "stroke-[#ff4885]"
  let parachuteStrokeColor = "stroke-[#b648ff]"

  let iconColorList = [
    {'color': healthStrokeColor, 'icon': faHeart},
    {'color': armorStrokeColor, 'icon': faShieldAlt},
    {'color': hungerStrokeColor, 'icon': faHamburger},
    {'color': thirstStrokeColor, 'icon': faTint},
    {'color': stressStrokeColor, 'icon': faBrain},
    {'color': armedStrokeColor, 'icon': faStream},
    {'color': parachuteStrokeColor, 'icon': faParachuteBox},
    {'color': nosStrokeColor, 'icon': faMeteor},
  ]
// bg-dark-100
</script>
<main class="min-h-screen bg-dark-100 flex flex-col gap-3">
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
        <div class="flex flex-col my-[-42px] mx-[-25px] gap-2">
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

</main>

