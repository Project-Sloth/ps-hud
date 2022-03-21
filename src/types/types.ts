import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
// translate({translate?.x} {translate?.y})
export type shapeType = {
  height: number,
  icon: IconDefinition,
  iconColor: string,
  iconScaling: number,
  iconTranslateX: number,
  iconTranslateY: number,
  ifShowing: boolean,
  innerColor: string,
  progressColor: string,
  progressValue: number,
  ringSize: number,
  rotateDegree: number,
  shape: "circle-ring"  | "square-ring" | "star-ring" | "triangle-ring" | "hexagon-ring" | 
         "diamond-ring" | "full-circle" | "horizontal-bar" | "vertical-bar",
  translateX: number,
  translateY: number,
  width: number
}