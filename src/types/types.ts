import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type shapeType = {
  height: number,
  icon: IconDefinition,
  iconColor: string,
  iconScaling: number,
  iconTranslateX: number,
  iconTranslateY: number,
  ifShowing: boolean,
  innerColor: string,
  outlineColor: string,
  outlineColorOpacity: number,
  progressColor: string,
  progressValue: number,
  ringSize: number,
  rotateDegree: number,
  shape: "circle-ring"  | "circle-whole" |"square-ring" | "star-ring" | "triangle-ring" |
         "hexagon-ring" | "diamond-ring" | "square-circular-fill" | "square-whole" |
         "vertical-bar" | "icon-percentage"
  translateX: number,
  translateY: number,
  width: number
}

export type shapePropsType =  Omit<shapeType, "shape" | "ifShowing">;

export function defaultShapeProps(): shapePropsType {
  return {
    height: 50,
    icon: null,
    iconColor: "white",
    iconScaling: 0.25,
    iconTranslateX: 0,
    iconTranslateY: 0,
    innerColor: "black",
    outlineColor: "",
    outlineColorOpacity: 1,
    progressColor: "red",
    progressValue: 100,
    ringSize: 3,
    rotateDegree: 0,
    translateX: 0,
    translateY: 0,
    width: 50,
  }
}