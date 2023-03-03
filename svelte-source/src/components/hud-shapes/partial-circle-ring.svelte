<script lang="ts">
  import Fa from 'svelte-fa';
  import { linear } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  export let displayOutline: boolean = true;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconRotateDegree: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 1;
  export let name: string = "";
  export let outlineColor: string = "red";
  export let outlineColorOpacity: number = 0.4;
  export let progressColor: string = "red";
  export let progressValue: number = 100;
  export let ringSize: number = 4;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;
  export let maxLengthDisplay: number = 100;
  export let maxProgressValue: number = 100;
  export let showInnerBG: boolean = false;
  export let displayNumber: number = 0;
  export let text: string = "";
  
  let radius: number = 25;
  let transposeValue: number = progressValue / maxProgressValue * 100;

  const progressTween = tweened(transposeValue, {
		duration: 600,
		easing: linear,
	});

  const displayNumberTween = tweened(displayNumber, {
    duration: 600,
    easing: linear,
  })

  $: {
    progressValue = Math.min(progressValue, maxProgressValue);
    transposeValue = progressValue / maxProgressValue * 100;
    progressTween.set(transposeValue);
  }

  $: displayNumberTween.set(displayNumber);

  let normalizedRadius: number = radius - (ringSize/2);
  let circumference: number = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - $progressTween / 100 * circumference;

  $: radius = height > width ? height/2 : width/2;
  $: {
    normalizedRadius = radius - (ringSize/2);
    circumference = (normalizedRadius * 2 * Math.PI);
  }
  $: {
    strokeDashoffset = (circumference) - ($progressTween/(100/maxLengthDisplay)) / 100 * circumference;
  }
  
  // track circle
  //       style="filter: drop-shadow(0px 0px 6px {progressColor}) contrast(200%);"
  // progress circle
  //       style="filter: drop-shadow(0px 0px 10px {progressColor}) contrast(300%) contrast(175%);"
  // icon
  //       style="filter: drop-shadow(0px 0px 10px {progressColor}) contrast(300%);"
</script>

<svg
  width={radius * 2}
  height={radius * 2}
  viewBox = "0 0 {radius * 2} {radius * 2}"
  overflow="visible"
>
  <g 
    transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+radius+" "+radius+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
  >
    {#if displayOutline}
      <circle
        opacity={outlineColorOpacity}
        fill="transparent"
        stroke={outlineColor}
        stroke-dashoffset={circumference - maxLengthDisplay / 100 * circumference}
        stroke-dasharray={circumference + ' ' + circumference}
        stroke-width={ringSize}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform="rotate(-90, {radius}, {radius})"
      />
    {/if}
    {#if showInnerBG}
    <circle
      fill={innerColor}
      fill-opacity={innerColorOpacity}
      stroke="transparent"
      stroke-dashoffset={0}
      stroke-dasharray={circumference +' ' + circumference}
      stroke-width={ringSize-0.6}
      r={normalizedRadius - (ringSize/2) + 0.1}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    {/if}
    <circle
      stroke="{progressColor}"
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
  </g>
  {#if text}
  <text class="vehicle-number" fill="white" x="50%" y="45%" dominant-baseline="middle" text-anchor="middle">
    {Math.floor($displayNumberTween)}
  </text>
  <text class="vehicle-text" fill="white" x="50%" y="70%" dominant-baseline="middle" text-anchor="middle">
    {text}
  </text>
  {/if}
  <g >
    {#if icon}
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor}"/>
    {/if}
  </g>
</svg>

<style>
  .vehicle-number {
    font-size: 2.4vh;
    color: #ffffff;
    font-weight: 600;
    text-shadow: -1px -1px 0 rgba(0,0,0, 0.7), 1px -1px 0 rgba(0,0,0, 0.7), -1px 1px 0 rgba(0,0,0, 0.7), 1px 1px 0 rgba(0,0,0, 0.7); 
  }

  .vehicle-text {
    font-weight: 900;
    text-shadow: -1px -1px 0 rgba(0,0,0, 0.7), 1px -1px 0 rgba(0,0,0, 0.7), -1px 1px 0 rgba(0,0,0, 0.7), 1px 1px 0 rgba(0,0,0, 0.7); 
  }


@media (min-width: 800px) {
  .vehicle-number {
    font-size: 2vh!important;
  }
  .vehicle-text {
    font-size: 0.9vh!important;
  }
}

@media (width: 3840px) and (height: 2160px) {
  .vehicle-number  {
    font-size: 1.2vh!important;
  }
  .vehicle-text {
    font-size: 0.6vh!important;
  }
}

@media (width: 3440px) and (height: 1440px) {
  .vehicle-number {
    font-size: 1.4vh!important;
  }
  .vehicle-text {
    font-size: 0.7vh!important;
  }
}

@media (width: 2560px) and (height: 1440px) {
  .vehicle-number  {
    font-size: 1.4vh!important;
  }
  .vehicle-text {
    font-size: 0.7vh!important;
  }
}

@media (width: 2560px) and (height: 1080px) {
    .vehicle-number {
        font-size: 1.7vh !important;
    }
    .vehicle-text {
        font-size: 0.9vh !important;
    }
}

@media (width: 1920px) and (height: 1440px) {
  .vehicle-number  {
    font-size: 1.6vh!important;
  }
  .vehicle-text {
    font-size: 0.7vh!important;
  }
}

@media (width: 1920px) and (height: 1200px) {
  .vehicle-number {
    font-size: 1.8vh!important;
  }
  .vehicle-text {
    font-size: 0.8vh!important;
  }
}

@media (width: 1920px) and (height: 1080px) {
  .vehicle-number {
    font-size: 2vh!important;
  }
  .vehicle-text {
    font-size: 1.1vh!important;
  }
}

@media (width: 1280px) and (height: 720px) {
  .vehicle-number {
    font-size: 3vh!important;
  }
  .vehicle-text {
    font-size: 1.4vh!important;
  }
}
</style>