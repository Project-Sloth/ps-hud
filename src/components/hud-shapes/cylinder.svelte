<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  const progressTween = tweened(props.progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(props.progressValue)
  }
  // darken(#392F32,5%);


  // var updateProgressCylinder = function(value){
  // var s = Snap('#'+idCylinder);

  // var cylContent = cylinderPrgrs.find('.progress-content');
  // var rect = s.select('.progress-content>rect');
  // var topEllipse = s.select('.progress-content>.top');
  
  //       //0% =  {y:90, height:0} / 100% = {y:20, height:80}
  // rect.attr({height: (80-(progressValue*.8)), y: (progressValue*.8)+20 });
  //       // 20 = 100% -- 100 = 0%
  // topEllipse.attr({cy: ((-progressValue*-.8)+20)});
  // s.select('.percentage').attr({ text: (100-(progressValue)+"%")});

</script>

<svg id="cylinder-progress" width="100px" height="200px" viewBox="0 0 150 250">
  <g class="progress-container" fill={props.outlineColor} opacity={props.outlineColorOpacity}>
    <rect x="0" y="20" width="100%" height="80"></rect>
    <ellipse cx="75" cy="20" rx="50%" ry="15" class="top"></ellipse>
    <!-- <ellipse cx="75" cy="100" rx="50%" ry="15" class="bottom"></ellipse> -->
  </g>
  <g class="progress-content" fill={props.progressColor}>
    {#if props.progressValue < 100}
    <rect x="0" y={($progressTween*.8)+20} width="100%" height={(80-($progressTween*.8))}></rect>
      {#if props.progressValue < 95}
      <ellipse cx="75" cy={((-$progressTween*-.8)+25)} rx="50%" ry="15" class="top"></ellipse>
      {/if}
    {/if}
  </g>
  <!-- <g class="progress-container">
    <ellipse cx="75" cy="20" rx="50%" ry="15" class="top" fill="none"></ellipse>
  </g> -->
  <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY || -0.3} style="color:{props.iconColor}"
  />
</svg>

<style>
  .progress-container .top {
      z-index:2;
    }
  .progress-content .top{
      z-index:1;
    }
</style>
