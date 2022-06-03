<script lang="ts">
  import { faHeart } from '@fortawesome/free-solid-svg-icons'

  export let height: number = 50;
  export let width: number = 50;
  export let icon: any = faHeart;
  export let progressColor: string = "red"

  let i = icon.icon;
  let path: string = i[4] as string;
</script>

<svg
  height={height}
  width={width}
  viewBox={`0 0 ${i[0]} ${i[1]}`}
  aria-hidden="true"
  role="img"
  xmlns="http://www.w3.org/2000/svg">
  <g>
    <path
      d={path}
      fill={progressColor}
    />
  </g>
</svg>